import { ICategory } from '@bic_todo/domain/entities/category';
import { ICategoryState } from '@bic_todo/domain/repositories/category-state';
import { ReduxCategoryActions } from '@bic_todo/infrastructure/redux/slices/categorySlice';
import { AppDispatch } from '@bic_todo/infrastructure/redux/store';

class ReduxCategoryState implements ICategoryState {
  constructor(private readonly dispatch: AppDispatch) {}

  addCategory(category: ICategory): void {
    this.dispatch(ReduxCategoryActions.addCategory(category));
  }
  updateCategory(category: ICategory): void {
    this.dispatch(ReduxCategoryActions.updateCategory(category));
  }
  deleteCategory(categoryId: number): void {
    this.dispatch(ReduxCategoryActions.deleteCategory(categoryId));
  }
  setCategories(categories: ICategory[]): void {
    this.dispatch(ReduxCategoryActions.setCategories(categories));
  }
}

let reduxCategoryStateInstance: ReduxCategoryState;
export const useReduxCategoryState = (dispatch: AppDispatch) => {
  if (reduxCategoryStateInstance === undefined) {
    reduxCategoryStateInstance = new ReduxCategoryState(dispatch);
  }
  return reduxCategoryStateInstance;
};
