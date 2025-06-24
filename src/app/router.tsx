import { createBrowserRouter } from 'react-router-dom';
import { TasksPage } from '../pages/tasks/TasksPage';
import { TaskDetailPage } from '../pages/task-detail/TaskDetailPage';
import { TaskCreatePage } from '../pages/task-create/TaskCreatePage';
import { TaskEditPage } from '../pages/task-edit/TaskEditPage';
import { Layout } from './Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <TasksPage />,
      },
      {
        path: 'tasks/new',
        element: <TaskCreatePage />,
      },
      {
        path: 'tasks/:id',
        element: <TaskDetailPage />,
      },
      {
        path: 'tasks/:id/edit',
        element: <TaskEditPage />,
      },
    ],
  },
]);
