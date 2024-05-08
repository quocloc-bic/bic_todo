import { createAsyncThunk } from '@reduxjs/toolkit';
import * as repository from '@bic_todo/repositories/task';
import * as taskSlice from '@bic_todo/redux/slices/taskSlice';

export const updateTask = createAsyncThunk(
  'task/update',
  async (task: ITask, { dispatch }) => {
    const newId = await repository.updateTask(task);

    dispatch(taskSlice.updateTask(task));
  },
);

export const deleteTask = createAsyncThunk(
  'task/delete',
  async (id: number, { dispatch }) => {
    await repository.deleteTask(id);

    dispatch(taskSlice.deleteTask(id));
  },
);
