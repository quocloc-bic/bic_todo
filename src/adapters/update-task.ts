import * as TaskUseCases from '@bic_todo/domain/use-cases/task';
import { useReduxTaskState } from '@bic_todo/infrastructure/implementations/redux-state/task';
import { useSqliteTaskRepository } from '@bic_todo/infrastructure/implementations/sqlite-repositories/task';
import { AppDispatch } from '@bic_todo/infrastructure/services/redux/store';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

export const useUpdateTaskScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const state = useReduxTaskState(dispatch);
  const repository = useSqliteTaskRepository();

  const deleteTask = useMemo(
    () => async (taskId: number) => {
      TaskUseCases.deleteTask(taskId, repository, state);
    },
    [],
  );

  return { deleteTask };
};
