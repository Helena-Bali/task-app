import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          Task Manager
        </Link>

        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>
            Задачи
          </Link>
          <Link to="/tasks/new" className={styles.navLink}>
            Создать задачу
          </Link>
        </nav>
      </div>
    </header>
  );
};
