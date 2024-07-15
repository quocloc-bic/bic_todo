import { ITask } from '@bic_todo/domain/entities/task';
import { ITaskState } from '@bic_todo/domain/repositories/task-state';
import { ReduxTaskActions } from '@bic_todo/infrastructure/redux/slices/taskSlice';
import { AppDispatch } from '@bic_todo/infrastructure/redux/store';

class ReduxTaskState implements ITaskState {
  constructor(private readonly dispatch: AppDispatch) {}

  addTask(task: ITask): void {
    this.dispatch(ReduxTaskActions.addTask(task));
  }
  updateTask(task: ITask): void {
    this.dispatch(ReduxTaskActions.updateTask(task));
  }
  deleteTask(taskId: number): void {
    this.dispatch(ReduxTaskActions.deleteTask(taskId));
  }
  setTasks(tasks: ITask[], appending: boolean): void {
    this.dispatch(ReduxTaskActions.setTasks({ tasks, appending }));
  }
  setCategoryTasks(tasks: ITask[], appending: boolean): void {
    this.dispatch(ReduxTaskActions.setCategoryTasks({ tasks, appending }));
  }
  setTodayTasks(tasks: ITask[], appending: boolean): void {
    this.dispatch(ReduxTaskActions.setTodayTasks({ tasks, appending }));
  }
  setCompletedTasks(tasks: ITask[], appending: boolean): void {
    this.dispatch(ReduxTaskActions.setCompletedTasks({ tasks, appending }));
  }
}

let reduxTaskStateInstance: ReduxTaskState;
export const useReduxTaskState = (dispatch: AppDispatch) => {
  if (reduxTaskStateInstance === undefined) {
    reduxTaskStateInstance = new ReduxTaskState(dispatch);
  }
  return reduxTaskStateInstance;
};
