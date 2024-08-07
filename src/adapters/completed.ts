import * as TaskUseCases from '@bic_todo/domain/use-cases/task';
import { useReduxTaskState } from '@bic_todo/infrastructure/implementations/redux-state/task';
import { useSqliteTaskRepository } from '@bic_todo/infrastructure/implementations/sqlite-repositories/task';
import { useAppSelector } from '@bic_todo/infrastructure/services/redux/hooks';
import { AppDispatch } from '@bic_todo/infrastructure/services/redux/store';
import { useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';

export const useCompletedTasksScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const state = useReduxTaskState(dispatch);
  const repository = useSqliteTaskRepository();
  const pageNumber = useRef(1);
  const hasMoreData = useRef(true);

  const pageSize = 20;

  const tasks = useAppSelector(state => state.task.completedTasks);

  const refresh = useMemo(
    () => async () => {
      pageNumber.current = 1;
      const _hasMoreData = await TaskUseCases.fetchAllCompletedTasks(
        pageNumber.current,
        pageSize,
        repository,
        state,
      );
      hasMoreData.current = _hasMoreData;
    },
    [],
  );

  const fetchMore = useMemo(
    () => async () => {
      if (!hasMoreData.current) return;

      pageNumber.current = pageNumber.current + 1;
      const _hasMoreData = await TaskUseCases.fetchAllCompletedTasks(
        pageNumber.current,
        pageSize,
        repository,
        state,
      );
      hasMoreData.current = _hasMoreData;
    },
    [],
  );

  return { tasks, refresh, fetchMore, hasMoreData: hasMoreData.current };
};
