import { ITask } from '@bic_todo/domain/entities/task';
import * as TaskUseCases from '@bic_todo/domain/use-cases/task';
import { useReduxTaskState } from '@bic_todo/infrastructure/implementations/redux-state/task';
import { useSqliteTaskRepository } from '@bic_todo/infrastructure/implementations/sqlite-repositories/task';
import { useAppSelector } from '@bic_todo/infrastructure/services/redux/hooks';
import { AppDispatch } from '@bic_todo/infrastructure/services/redux/store';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

export const useTaskActions = () => {
  const dispatch: AppDispatch = useDispatch();
  const state = useReduxTaskState(dispatch);
  const repository = useSqliteTaskRepository();

  const categories = useAppSelector(state => state.category.categories);
  const firstCategory = categories.at(0);

  const createTask = useMemo(
    () => async (params: TaskUseCases.TaskCreatingParams) => {
      TaskUseCases.createTask(params, repository, state);
    },
    [],
  );

  const updateTask = useMemo(
    () => async (task: ITask) => {
      TaskUseCases.updateTask(task, repository, state);
    },
    [],
  );

  return { firstCategory, categories, createTask, updateTask };
};
