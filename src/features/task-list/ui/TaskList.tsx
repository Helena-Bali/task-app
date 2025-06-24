import { useInfiniteQuery } from '@tanstack/react-query';
import { tasksApi } from '../../../shared/api/tasksApi';
import { TaskCard } from '../../../entities/task/ui/TaskCard';
import styles from './TaskList.module.scss';
import { z } from 'zod';

const PAGE_SIZE = 10;

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  createdAt: z.string().datetime().optional(),
});

export const TaskList = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['tasks'],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => tasksApi.getTasks(pageParam, PAGE_SIZE).then(res => res.data),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === PAGE_SIZE ? allPages.length + 1 : undefined,
  });

  if (status === 'pending') return <div>Загрузка...</div>;
  if (status === 'error') return <div>Ошибка загрузки</div>;

  const tasks = data?.pages.flat() ?? [];

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop === clientHeight && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <div className={styles.list} style={{ height: 400, overflow: 'auto' }} onScroll={handleScroll}>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
      {isFetchingNextPage && <div>Загрузка ещё...</div>}
    </div>
  );
};
