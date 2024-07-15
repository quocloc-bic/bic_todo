import { ICategory } from '../entities/category';

export interface ICategoryState {
  addCategory(category: ICategory): void;
  updateCategory(category: ICategory): void;
  deleteCategory(categoryId: number): void;
  setCategories(categories: ICategory[]): void;
}
