import * as TaskUseCases from '@bic_todo/domain/use-cases/task';
import { useReduxTaskState } from '@bic_todo/infrastructure/implementations/redux-state/task';
import { useSqliteTaskRepository } from '@bic_todo/infrastructure/implementations/sqlite-repositories/task';
import {
  useAppDispatch,
  useAppSelector,
} from '@bic_todo/infrastructure/redux/hooks';
import { AppDispatch } from '@bic_todo/infrastructure/redux/store';
import { useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';

export const useHomeScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const taskState = useReduxTaskState(dispatch);
  const repository = useSqliteTaskRepository();
  const pageNumber = useRef(1);
  const hasMoreData = useRef(true);

  const pageSize = 20;

  const tasks = useAppSelector(state => state.task.tasks);

  const refresh = useMemo(
    () => async () => {
      pageNumber.current = 1;
      const _hasMoreData = await TaskUseCases.fetchAllTasks(
        pageNumber.current,
        pageSize,
        repository,
        taskState,
      );
      hasMoreData.current = _hasMoreData;
    },
    [],
  );

  const fetchMore = useMemo(
    () => async () => {
      if (!hasMoreData.current) return;

      pageNumber.current = pageNumber.current + 1;
      const _hasMoreData = await TaskUseCases.fetchAllTasks(
        pageNumber.current,
        pageSize,
        repository,
        taskState,
      );
      hasMoreData.current = _hasMoreData;
    },
    [],
  );

  return { tasks, refresh, fetchMore, hasMoreData: hasMoreData.current };
};
