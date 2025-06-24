import axios from 'axios';
import type { Task } from '../../entities/task/types';

const API_URL = 'https://6808f522942707d722e08a28.mockapi.io/api/v1/news-data/tasks';

export const tasksApi = {
  getTasks: (page: number, limit: number) =>
    axios.get<Task[]>(API_URL, { params: { page, limit } }),
  getTask: (id: string) => axios.get<Task>(`${API_URL}/${id}`),
  createTask: (data: Omit<Task, 'id' | 'createdAt'>) => axios.post<Task>(API_URL, data),
  updateTask: (id: string, data: Partial<Task>) => axios.put<Task>(`${API_URL}/${id}`, data),
  deleteTask: (id: string) => axios.delete(`${API_URL}/${id}`),
}; 