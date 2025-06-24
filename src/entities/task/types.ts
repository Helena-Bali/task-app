import { z } from 'zod';

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  createdAt: z.string().datetime().optional(),
});

export type Task = z.infer<typeof TaskSchema>;
