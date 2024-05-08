import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface TaskState {
  tasks: ITask[];
  todayTasks: ITask[];
  completedTasks: ITask[];
}

const initialState: TaskState = {
  tasks: [],
  todayTasks: [],
  completedTasks: [],
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<ITask>) {
      state.tasks.push(action.payload);
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
    },
    fetchAllTasks(state, action: PayloadAction<ITask[]>) {
      state.tasks = action.payload;
    },
    fetchAllTodayTasks(state, action: PayloadAction<ITask[]>) {
      state.todayTasks = action.payload;
    },
    fetchAllCompletedTasks(state, action: PayloadAction<ITask[]>) {
      state.completedTasks = action.payload;
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  fetchAllTasks,
  fetchAllTodayTasks,
  fetchAllCompletedTasks,
} = taskSlice.actions;

export default taskSlice.reducer;
