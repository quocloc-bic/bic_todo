import { createAsyncThunk } from '@reduxjs/toolkit';
import * as repository from '@bic_todo/repositories/task';
import * as taskSlice from '@bic_todo/redux/slices/taskSlice';

export const createNewTask = createAsyncThunk(
  'task/create',
  async (task: UpdatingTask, { dispatch }) => {
    const newId = await repository.createTask(
      task.name,
      task.categoryId,
      task.dueDate,
    );

    if (!newId) throw 'Creation failed';

    const createdTask: ITask = {
      ...task,
      id: newId,
      isCompleted: false,
    };

    dispatch(taskSlice.addTask(createdTask));
  },
);

export const updateTask = createAsyncThunk(
  'task/update',
  async (task: ITask, { dispatch }) => {
    await repository.updateTask(task);

    dispatch(taskSlice.updateTask(task));
  },
);
