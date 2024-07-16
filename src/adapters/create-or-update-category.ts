import { ICategory } from '@bic_todo/domain/entities/category';
import * as CategoryUseCases from '@bic_todo/domain/use-cases/category';
import { useReduxCategoryState } from '@bic_todo/infrastructure/implementations/redux-state/category';
import { useSqliteCategoryRepository } from '@bic_todo/infrastructure/implementations/sqlite-repositories/category';
import { AppDispatch } from '@bic_todo/infrastructure/redux/store';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

export const useCreateOrUpdateCategoryScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const state = useReduxCategoryState(dispatch);
  const repository = useSqliteCategoryRepository();

  const createNewCategory = useMemo(
    () => async (params: CategoryUseCases.CategoryCreatingParams) => {
      CategoryUseCases.createCategory(params, repository, state);
    },
    [],
  );

  const updateCategory = useMemo(
    () => async (category: ICategory) => {
      CategoryUseCases.updateCategory(category, repository, state);
    },
    [],
  );

  const deleteCategory = useMemo(
    () => async (id: number) => {
      CategoryUseCases.deleteCategory(id, repository, state);
    },
    [],
  );

  return { createNewCategory, updateCategory, deleteCategory };
};
