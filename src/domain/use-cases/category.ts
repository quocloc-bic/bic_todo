import { ICategory } from '../entities/category';
import { ICategoryRepository } from '../repositories/category-repository';
import { ICategoryState } from '../repositories/category-state';

export type CategoryCreatingParams = {
  name: string;
  color: string;
  isDefault?: boolean;
};

export const createCategory = async (
  params: CategoryCreatingParams,
  repository: ICategoryRepository,
  state: ICategoryState,
) => {
  const createdCategoryId = await repository.create(
    params.name,
    params.color,
    params.isDefault,
  );

  if (!createdCategoryId) throw 'Creation failed';

  const createdCategory: ICategory = {
    ...params,
    id: createdCategoryId,
    isDefault: false,
  };

  state.addCategory(createdCategory);
};

export const updateCategory = async (
  category: ICategory,
  repository: ICategoryRepository,
  state: ICategoryState,
) => {
  await repository.update(category);
  state.updateCategory(category);
};

export const deleteCategory = async (
  categoryId: number,
  repository: ICategoryRepository,
  state: ICategoryState,
) => {
  await repository.delete(categoryId);
  state.deleteCategory(categoryId);
};

export const fetchAllCategories = async (
  repository: ICategoryRepository,
  state: ICategoryState,
) => {
  const categories = await repository.fetchAll();
  state.setCategories(categories);
};
