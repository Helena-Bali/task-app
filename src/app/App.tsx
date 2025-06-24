import { Routes, Route } from 'react-router-dom';
import { TasksPage } from '../pages/tasks/TasksPage';
import { TaskDetailsPage } from '../pages/task-details/TaskDetailsPage';

export const App = () => (
  <Routes>
    <Route path="/" element={<TasksPage />} />
    <Route path="/tasks/:id" element={<TaskDetailsPage />} />
  </Routes>
); 