import axios from 'axios';
import type { Task } from '../../entities/task/types';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const tasksApi = {
  getTasks: (page: number, limit: number) =>
    axios.get<Task[]>(API_URL, { params: { _page: page, _limit: limit } }),
  getTask: (id: number) => axios.get<Task>(`${API_URL}/${id}`),
  createTask: (data: Omit<Task, 'id'>) => axios.post<Task>(API_URL, data),
  updateTask: (id: number, data: Partial<Task>) => axios.put<Task>(`${API_URL}/${id}`, data),
  deleteTask: (id: number) => axios.delete(`${API_URL}/${id}`),
}; 