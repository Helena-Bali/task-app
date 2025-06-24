import { useParams, Link } from 'react-router-dom';
import { TaskDetail } from '../../features/task-detail/ui/TaskDetail';
import { useQuery } from '@tanstack/react-query';
import { tasksApi } from '../../shared/api/tasksApi';
import styles from './TaskDetailPage.module.scss';

export const TaskDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: task } = useQuery({
    queryKey: ['task', id],
    queryFn: () => id ? tasksApi.getTask(id).then(res => res.data) : null,
    enabled: !!id,
  });

  return (
    <div className={styles.container}>
      <TaskDetail />

      {task && (
        <div className={styles.actions}>
          <Link to={`/tasks/${id}/edit`} className={styles.editButton}>
            Редактировать
          </Link>
        </div>
      )}
    </div>
  );
};
