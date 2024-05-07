import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface TaskState {
  tasks: ITask[];
}

const initialState: TaskState = {
  tasks: [],
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
    },
    deleteTask(state, action: PayloadAction<number>) {
      const idToDelete = action.payload;
      state.tasks = state.tasks.filter(task => task.id !== idToDelete);
    },
    fetchAllTasks(state, action: PayloadAction<ITask[]>) {
      state.tasks = action.payload;
    },
  },
});

export const { addTask, updateTask, deleteTask, fetchAllTasks } =
  taskSlice.actions;

export default taskSlice.reducer;
