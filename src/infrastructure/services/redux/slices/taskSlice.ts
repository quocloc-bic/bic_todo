import { ITask } from '@bic_todo/domain/entities/task';
import { isTimestampToday } from '@bic_todo/utils/helpers';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface TaskListPayload {
  tasks: ITask[];
  appending: boolean;
}

interface TaskState {
  tasks: ITask[];
  todayTasks: ITask[];
  completedTasks: ITask[];
  categoryTasks: ITask[];
}

const initialState: TaskState = {
  tasks: [],
  todayTasks: [],
  completedTasks: [],
  categoryTasks: [],
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<ITask>) {
      const task = action.payload;
      state.tasks.push(task);

      if (isTimestampToday(task.dueDate)) {
        state.todayTasks.push(task);
      }
    },
    updateTask(state, action: PayloadAction<ITask>) {
      const { id } = action.payload;

      const existingTask = state.tasks.find(task => task.id === id);
      if (existingTask) {
        Object.assign(existingTask, action.payload);
      }

      const existingTaskOnTodayTasks = state.todayTasks.find(
        task => task.id === id,
      );
      if (existingTaskOnTodayTasks) {
        Object.assign(existingTaskOnTodayTasks, action.payload);
      } else if (isTimestampToday(action.payload.dueDate)) {
        state.todayTasks.push(action.payload);
      }

      const existingTaskOnCategoryTasks = state.categoryTasks.find(
        task => task.id === id,
      );
      if (existingTaskOnCategoryTasks) {
        Object.assign(existingTaskOnCategoryTasks, action.payload);
      }

      const existingTaskOnCompletedTasks = state.completedTasks.find(
        task => task.id === id,
      );
      if (existingTaskOnCompletedTasks) {
        if (!action.payload.isCompleted) {
          state.completedTasks = state.completedTasks.filter(
            task => task.id !== action.payload.id,
          );
        } else {
          Object.assign(existingTaskOnCompletedTasks, action.payload);
        }
      } else if (action.payload.isCompleted) {
        state.completedTasks.push(action.payload);
        state.completedTasks.sort((a, b) => a.id - b.id);
      }
    },
    deleteTask(state, action: PayloadAction<number>) {
      const idToDelete = action.payload;
      state.tasks = state.tasks.filter(task => task.id !== idToDelete);
      state.todayTasks = state.tasks.filter(task => task.id !== idToDelete);
      state.completedTasks = state.tasks.filter(task => task.id !== idToDelete);
      state.categoryTasks = state.tasks.filter(task => task.id !== idToDelete);
    },
    setTasks(state, action: PayloadAction<TaskListPayload>) {
      const { tasks, appending } = action.payload;
      if (appending) {
        state.tasks = [...state.tasks, ...tasks];
      } else {
        state.tasks = tasks;
      }
    },
    setTodayTasks(state, action: PayloadAction<TaskListPayload>) {
      const { tasks, appending } = action.payload;
      if (appending) {
        state.todayTasks = [...state.todayTasks, ...tasks];
      } else {
        state.todayTasks = tasks;
      }
    },
    setCompletedTasks(state, action: PayloadAction<TaskListPayload>) {
      const { tasks, appending } = action.payload;
      if (appending) {
        state.completedTasks = [...state.completedTasks, ...tasks];
      } else {
        state.completedTasks = tasks;
      }
    },
    setCategoryTasks(state, action: PayloadAction<TaskListPayload>) {
      const { tasks, appending } = action.payload;
      if (appending) {
        state.categoryTasks = [...state.categoryTasks, ...tasks];
      } else {
        state.categoryTasks = tasks;
      }
    },
  },
});

export const ReduxTaskActions = taskSlice.actions;

export default taskSlice.reducer;
