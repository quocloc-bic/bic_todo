import * as repository from '@bic_todo/repositories/task';
import * as taskSlice from '@bic_todo/redux/slices/taskSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@bic_todo/redux/store';

export const fetchAllCompletedTasks = createAsyncThunk<
  boolean,
  number,
  { state: RootState }
>(
  'task/fetchAllCompletedTasks',
  async (page: number, { dispatch, getState }) => {
    const tasks = await repository.fetchAllCompletedTasks(page);

    if (page == 1) {
      dispatch(taskSlice.fetchAllCompletedTasks(tasks));
    } else {
      const prevData = getState().task.completedTasks;

      dispatch(taskSlice.fetchAllCompletedTasks([...prevData, ...tasks]));
    }

    return tasks.length > 0;
  },
);
