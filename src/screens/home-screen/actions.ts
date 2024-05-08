import * as repository from '@bic_todo/repositories/task';
import * as taskSlice from '@bic_todo/redux/slices/taskSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@bic_todo/redux/store';

export const fetchAllTasks = createAsyncThunk<
  boolean,
  number,
  { state: RootState }
>('task/fetchAllTasks', async (page: number, { dispatch, getState }) => {
  const tasks = await repository.fetchAllTasks(page);

  if (page == 1) {
    dispatch(taskSlice.fetchAllTasks(tasks));
  } else {
    const prevData = getState().task.tasks;

    dispatch(taskSlice.fetchAllTasks([...prevData, ...tasks]));
  }

  return tasks.length > 0;
});
