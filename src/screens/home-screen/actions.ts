import { createAsyncThunk } from '@reduxjs/toolkit';
import * as repository from '@bic_todo/repositories/task';
import * as taskSlice from '@bic_todo/redux/slices/taskSlice';

export const toggleIsTaskCompleted = createAsyncThunk(
  'task/toggleIsTaskCompleted',
  async (task: ITask, { dispatch }) => {
    const updatingTask: ITask = {
      ...task,
      isCompleted: !task.isCompleted,
    };

    await repository.updateTask(updatingTask);

    dispatch(taskSlice.updateTask(updatingTask));
  },
);
