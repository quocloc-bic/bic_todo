import { ITask } from '../entities/task';

export interface ITaskState {
  addTask(task: ITask): void;
  updateTask(task: ITask): void;
  deleteTask(taskId: number): void;

  setTasks(tasks: ITask[], appending: boolean): void;
  setCategoryTasks(tasks: ITask[], appending: boolean): void;
  setTodayTasks(tasks: ITask[], appending: boolean): void;
  setCompletedTasks(tasks: ITask[], appending: boolean): void;
}
