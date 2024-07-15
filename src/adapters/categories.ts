import * as CategoryUseCases from '@bic_todo/domain/use-cases/category';
import { useReduxCategoryState } from '@bic_todo/infrastructure/implementations/redux-state/category';
import { useSqliteCategoryRepository } from '@bic_todo/infrastructure/implementations/sqlite-repositories/category';
import {
  useAppDispatch,
  useAppSelector,
} from '@bic_todo/infrastructure/redux/hooks';
import { AppDispatch } from '@bic_todo/infrastructure/redux/store';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

export const useCategoriesScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const categoryState = useReduxCategoryState(dispatch);
  const categoryRepository = useSqliteCategoryRepository();

  const categories = useAppSelector(state => state.category.categories);

  const fetchAllCategories = useMemo(
    () => async () => {
      CategoryUseCases.fetchAllCategories(categoryRepository, categoryState);
    },
    [],
  );

  return { fetchAllCategories, categories };
};
