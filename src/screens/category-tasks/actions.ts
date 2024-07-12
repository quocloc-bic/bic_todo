import * as repository from '@bic_todo/repositories/task';
import * as taskSlice from '@bic_todo/redux/slices/taskSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@bic_todo/redux/store';

export const fetchAllTasksByCategoryId = createAsyncThunk<
  boolean,
  { categoryId: number; page: number },
  { state: RootState }
>('task/fetchAllTasksByCategoryId', async (args, { dispatch, getState }) => {
  const tasks = await repository.fetchAllTasksByCategoryId(
    args.categoryId,
    args.page,
  );

  if (args.page == 1) {
    dispatch(taskSlice.fetchAllCategoryTasks(tasks));
  } else {
    const prevData = getState().task.categoryTasks;

    dispatch(taskSlice.fetchAllCategoryTasks([...prevData, ...tasks]));
  }

  return tasks.length > 0;
});
