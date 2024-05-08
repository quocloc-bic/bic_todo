import * as repository from '@bic_todo/repositories/task';
import * as taskSlice from '@bic_todo/redux/slices/taskSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@bic_todo/redux/store';

export const fetchAllTodayTasks = createAsyncThunk<
  boolean,
  number,
  { state: RootState }
>('task/fetchAllTodayTasks', async (page: number, { dispatch, getState }) => {
  const tasks = await repository.fetchAllTodayTasks(page);
  if (page == 1) {
    dispatch(taskSlice.fetchAllTodayTasks(tasks));
  } else {
    const prevData = getState().task.todayTasks;

    dispatch(taskSlice.fetchAllTodayTasks([...prevData, ...tasks]));
  }

  return tasks.length > 0;
});
