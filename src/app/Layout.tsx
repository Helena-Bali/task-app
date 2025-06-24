import { Outlet } from 'react-router-dom';
import { Header } from '../widgets/header/ui/Header';
import styles from './Layout.module.scss';

export const Layout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>© {new Date().getFullYear()} Task Manager</p>
        </div>
      </footer>
    </div>
  );
};
