import { ITask } from '../entities/task';

export interface ITaskRepository {
  configure(): Promise<void>;
  create(
    name: string,
    categoryId: number,
    dueDate: number,
  ): Promise<number | undefined>;
  update(task: ITask): Promise<void>;
  delete(id: number): Promise<void>;

  toggleCompletion(id: number, isCompleted: boolean): Promise<void>;

  fetchAllTasks(pageNumber: number, limit: number): Promise<ITask[]>;
  fetchAllCompletedTasks(pageNumber: number, limit: number): Promise<ITask[]>;
  fetchAllTodayTasks(pageNumber: number, limit: number): Promise<ITask[]>;
  fetchAllTasksByCategoryId(
    categoryId: number,
    pageNumber: number,
    limit: number,
  ): Promise<ITask[]>;
}
