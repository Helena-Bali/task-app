import { TaskForm } from '../../features/task-form/ui/TaskForm';
import { useNavigate } from 'react-router-dom';
import styles from './TaskCreatePage.module.scss';

export const TaskCreatePage = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <TaskForm mode="create" onCancel={handleCancel} />
    </div>
  );
};
