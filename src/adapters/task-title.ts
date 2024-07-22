import { ITask } from '@bic_todo/domain/entities/task';
import * as TaskUseCases from '@bic_todo/domain/use-cases/task';
import { useReduxTaskState } from '@bic_todo/infrastructure/implementations/redux-state/task';
import { useSqliteTaskRepository } from '@bic_todo/infrastructure/implementations/sqlite-repositories/task';
import { AppDispatch } from '@bic_todo/infrastructure/services/redux/store';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

export const useTaskTile = () => {
  const dispatch: AppDispatch = useDispatch();
  const state = useReduxTaskState(dispatch);
  const repository = useSqliteTaskRepository();

  const toggleTaskCompletion = useMemo(
    () => async (task: ITask) => {
      const updatingTask: ITask = {
        ...task,
        isCompleted: !task.isCompleted,
      };
      TaskUseCases.updateTask(updatingTask, repository, state);
    },
    [],
  );

  return { toggleTaskCompletion };
};
