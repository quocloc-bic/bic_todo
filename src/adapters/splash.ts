import * as AppUseCases from '@bic_todo/domain/use-cases/app';
import * as CategoryUseCases from '@bic_todo/domain/use-cases/category';
import { useReduxCategoryState } from '@bic_todo/infrastructure/implementations/redux-state/category';
import { useSqliteCategoryRepository } from '@bic_todo/infrastructure/implementations/sqlite-repositories/category';
import { useSqliteTaskRepository } from '@bic_todo/infrastructure/implementations/sqlite-repositories/task';
import { AppDispatch } from '@bic_todo/infrastructure/redux/store';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

export const useSplashScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const categoryState = useReduxCategoryState(dispatch);
  const taskRepository = useSqliteTaskRepository();
  const categoryRepository = useSqliteCategoryRepository();

  const initialize = useMemo(
    () => async () => {
      await AppUseCases.initialize(categoryRepository, taskRepository);
      await CategoryUseCases.fetchAllCategories(
        categoryRepository,
        categoryState,
      );
    },
    [],
  );

  return { initialize };
};
