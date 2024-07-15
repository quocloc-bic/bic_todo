import { ICategory } from '@bic_todo/domain/entities/category';
import * as CategoryUseCases from '@bic_todo/domain/use-cases/category';
import { useReduxCategoryState } from '@bic_todo/infrastructure/implementations/redux-state/category';
import { useSqliteCategoryRepository } from '@bic_todo/infrastructure/implementations/sqlite-repositories/category';
import { useAppDispatch } from '@bic_todo/infrastructure/redux/hooks';
import { AppDispatch } from '@bic_todo/infrastructure/redux/store';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

export const useCreateOrUpdateCategoryScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const categoryState = useReduxCategoryState(dispatch);
  const categoryRepository = useSqliteCategoryRepository();

  const createNewCategory = useMemo(
    () => async (params: CategoryUseCases.CategoryCreatingParams) => {
      CategoryUseCases.createCategory(
        params,
        categoryRepository,
        categoryState,
      );
    },
    [],
  );

  const updateCategory = useMemo(
    () => async (category: ICategory) => {
      CategoryUseCases.updateCategory(
        category,
        categoryRepository,
        categoryState,
      );
    },
    [],
  );

  const deleteCategory = useMemo(
    () => async (id: number) => {
      CategoryUseCases.deleteCategory(id, categoryRepository, categoryState);
    },
    [],
  );

  return { createNewCategory, updateCategory, deleteCategory };
};
