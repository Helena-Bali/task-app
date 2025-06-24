import { useInfiniteQuery } from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
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
  const parentRef = useRef<HTMLDivElement>(null);

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

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? tasks.length + 1 : tasks.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80, // Примерная высота каждой карточки задачи
    overscan: 5,
  });

  // Загружаем следующую страницу, когда пользователь приближается к концу списка
  const lastItemIndex = rowVirtualizer.range.endIndex;
  if (
    hasNextPage &&
    !isFetchingNextPage &&
    lastItemIndex >= tasks.length - 1
  ) {
    fetchNextPage();
  }

  return (
    <div
      ref={parentRef}
      className={styles.list}
      style={{ height: 500, overflow: 'auto' }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const isLoaderRow = virtualRow.index >= tasks.length;
          return (
            <div
              key={virtualRow.index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {isLoaderRow ? (
                <div className={styles.loaderItem}>Загрузка ещё...</div>
              ) : (
                <TaskCard task={tasks[virtualRow.index]} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
