import {Link} from 'react-router-dom';
import {TaskList} from '../../features/task-list/ui/TaskList';
import styles from './TasksPage.module.scss';

export const TasksPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Список задач</h1>
                <Link to="/tasks/new" className={styles.createButton}>
                    Создать задачу
                </Link>
            </div>
            <TaskList/>
        </div>
    );
};
