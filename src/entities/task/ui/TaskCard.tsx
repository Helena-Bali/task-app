import { Link } from 'react-router-dom';
import type { Task } from '../types';
import styles from './TaskCard.module.scss';

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.id}>#{task.id}</span>
        <h3 className={styles.title}>{task.title}</h3>
      </div>
      <p className={styles.body}>{truncateText(task.body, 100)}</p>
      <div className={styles.footer}>
        {task.createdAt && (
          <span className={styles.date}>
            {new Date(task.createdAt).toLocaleDateString()}
          </span>
        )}
        <Link to={`/tasks/${task.id}`} className={styles.viewButton}>
          Просмотр
        </Link>
      </div>
    </div>
  );
};
