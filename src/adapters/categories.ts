import * as CategoryUseCases from '@bic_todo/domain/use-cases/category';
import { useReduxCategoryState } from '@bic_todo/infrastructure/implementations/redux-state/category';
import { useSqliteCategoryRepository } from '@bic_todo/infrastructure/implementations/sqlite-repositories/category';
import { useAppSelector } from '@bic_todo/infrastructure/services/redux/hooks';
import { AppDispatch } from '@bic_todo/infrastructure/services/redux/store';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

export const useCategoriesScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const state = useReduxCategoryState(dispatch);
  const repository = useSqliteCategoryRepository();

  const categories = useAppSelector(state => state.category.categories);

  const fetchAllCategories = useMemo(
    () => async () => {
      CategoryUseCases.fetchAllCategories(repository, state);
    },
    [],
  );

  return { fetchAllCategories, categories };
};
