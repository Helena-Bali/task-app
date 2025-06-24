import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { tasksApi } from '../../../shared/api/tasksApi';
import type { Task } from '../../../entities/task/types';
import styles from './TaskForm.module.scss';

interface TaskFormProps {
  initialData?: Partial<Task>;
  mode: 'create' | 'edit';
  onCancel?: () => void;
}

export const TaskForm = ({ initialData, mode, onCancel }: TaskFormProps) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [body, setBody] = useState(initialData?.body || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const createMutation = useMutation({
    mutationFn: (data: Omit<Task, 'id' | 'createdAt'>) => tasksApi.createTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      navigate('/');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Task> }) =>
      tasksApi.updateTask(id, data),
    onSuccess: () => {
      if (initialData?.id) {
        queryClient.invalidateQueries({ queryKey: ['task', initialData.id] });
        queryClient.invalidateQueries({ queryKey: ['tasks'] });
      }
      navigate(-1);
    },
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = 'Заголовок обязателен';
    }

    if (!body.trim()) {
      newErrors.body = 'Описание обязательно';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const data = { title, body };

    if (mode === 'create') {
      createMutation.mutate(data);
    } else if (mode === 'edit' && initialData?.id) {
      updateMutation.mutate({ id: initialData.id, data });
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;
  const error = createMutation.error || updateMutation.error;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>
        {mode === 'create' ? 'Создание новой задачи' : 'Редактирование задачи'}
      </h2>

      <div className={styles.field}>
        <label htmlFor="title" className={styles.label}>Заголовок</label>
        <input
          id="title"
          type="text"
          className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSubmitting}
        />
        {errors.title && <p className={styles.error}>{errors.title}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="body" className={styles.label}>Описание</label>
        <textarea
          id="body"
          className={`${styles.textarea} ${errors.body ? styles.inputError : ''}`}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={5}
          disabled={isSubmitting}
        />
        {errors.body && <p className={styles.error}>{errors.body}</p>}
      </div>

      {error && (
        <div className={styles.formError}>
          Произошла ошибка: {error instanceof Error ? error.message : 'Неизвестная ошибка'}
        </div>
      )}

      <div className={styles.buttons}>
        {onCancel && (
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Отмена
          </button>
        )}
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Сохранение...' : mode === 'create' ? 'Создать' : 'Сохранить'}
        </button>
      </div>
    </form>
  );
};
