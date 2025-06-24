import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { TaskForm } from '../../features/task-form/ui/TaskForm';
import { tasksApi } from '../../shared/api/tasksApi';
import styles from './TaskEditPage.module.scss';

export const TaskEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: task, status } = useQuery({
    queryKey: ['task', id],
    queryFn: () => id ? tasksApi.getTask(id).then(res => res.data) : null,
    enabled: !!id,
  });

  const handleCancel = () => {
    navigate(-1);
  };

  if (status === 'pending') return <div>Загрузка...</div>;
  if (status === 'error') return <div>Ошибка загрузки</div>;
  if (!task) return <div>Задача не найдена</div>;

  return (
    <div className={styles.container}>
      <TaskForm 
        mode="edit" 
        initialData={task}
        onCancel={handleCancel}
      />
    </div>
  );
};
