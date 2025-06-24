import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { tasksApi } from '../../../shared/api/tasksApi';
import styles from './TaskDetail.module.scss';

export const TaskDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: task, status } = useQuery({
    queryKey: ['task', id],
    queryFn: () => id ? tasksApi.getTask(id).then(res => res.data) : null,
  });

  const handleBack = () => {
    navigate(-1);
  };

  if (status === 'pending') return <div>Загрузка...</div>;
  if (status === 'error') return <div>Ошибка загрузки</div>;
  if (!task) return <div>Задача не найдена</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={handleBack} className={styles.backButton}>
          ← Назад
        </button>
        <h1 className={styles.title}>{task.title}</h1>
        <span className={styles.id}>ID: {task.id}</span>
      </div>

      <div className={styles.content}>
        <p className={styles.body}>{task.body}</p>
      </div>

      {task.createdAt && (
        <div className={styles.footer}>
          <div className={styles.dateContainer}>
            <span className={styles.dateLabel}>Создано:</span>
            <span className={styles.date}>
              {new Date(task.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
