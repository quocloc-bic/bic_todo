import { ITask } from '../entities/task';
import { ITaskRepository } from '../repositories/task-repository';
import { ITaskState } from '../state-managers/task-state';

export type TaskCreatingParams = {
  name: string;
  categoryId: number;
  dueDate: number;
};

export const createTask = async (
  params: TaskCreatingParams,
  repository: ITaskRepository,
  state: ITaskState,
): Promise<void> => {
  const createdTaskId = await repository.create(
    params.name,
    params.categoryId,
    params.dueDate,
  );

  if (!createdTaskId) throw 'Creation failed';

  const createdTask: ITask = {
    ...params,
    id: createdTaskId,
    isCompleted: false,
  };

  state.addTask(createdTask);
};

export const updateTask = async (
  task: ITask,
  repository: ITaskRepository,
  state: ITaskState,
): Promise<void> => {
  await repository.update(task);
  state.updateTask(task);
};

export const deleteTask = async (
  taskId: number,
  repository: ITaskRepository,
  state: ITaskState,
): Promise<void> => {
  await repository.delete(taskId);
  state.deleteTask(taskId);
};

export const fetchAllTasks = async (
  pageNumber: number,
  limit: number,
  repository: ITaskRepository,
  state: ITaskState,
): Promise<boolean> => {
  const tasks = await repository.fetchAllTasks(pageNumber, limit);
  const appending = pageNumber != 1;
  state.setTasks(tasks, appending);

  return tasks.length > 0;
};

export const fetchAllTodayTasks = async (
  pageNumber: number,
  limit: number,
  repository: ITaskRepository,
  state: ITaskState,
): Promise<boolean> => {
  const tasks = await repository.fetchAllTodayTasks(pageNumber, limit);
  const appending = pageNumber != 1;
  state.setTodayTasks(tasks, appending);

  return tasks.length > 0;
};

export const fetchAllCompletedTasks = async (
  pageNumber: number,
  limit: number,
  repository: ITaskRepository,
  state: ITaskState,
): Promise<boolean> => {
  const tasks = await repository.fetchAllCompletedTasks(pageNumber, limit);
  const appending = pageNumber != 1;
  state.setCompletedTasks(tasks, appending);

  return tasks.length > 0;
};

export const fetchAllTasksByCategoryId = async (
  categoryId: number,
  pageNumber: number,
  limit: number,
  repository: ITaskRepository,
  state: ITaskState,
): Promise<boolean> => {
  const tasks = await repository.fetchAllTasksByCategoryId(
    categoryId,
    pageNumber,
    limit,
  );
  const appending = pageNumber != 1;
  state.setCategoryTasks(tasks, appending);

  return tasks.length > 0;
};
