import { createAsyncThunk } from '@reduxjs/toolkit';
import * as repository from '@bic_todo/repositories/category';
import * as categorySlice from '@bic_todo/redux/slices/categorySlice';

export const createNewCategory = createAsyncThunk(
  'category/create',
  async (category: UpdatingCategory, { dispatch }) => {
    const newId = await repository.createCategory(
      category.name,
      category.color,
    );

    if (!newId) throw 'Creation failed';

    const createdCategory: ICategory = {
      ...category,
      id: newId,
      isDefault: false,
    };

    dispatch(categorySlice.addCategory(createdCategory));
  },
);

export const updateCategory = createAsyncThunk(
  'category/update',
  async (category: ICategory, { dispatch }) => {
    await repository.updateCategory(category);

    dispatch(categorySlice.updateCategory(category));
  },
);

export const deleteCategory = createAsyncThunk(
  'category/delete',
  async (id: number, { dispatch }) => {
    await repository.deleteCategory(id);

    dispatch(categorySlice.deleteCategory(id));
  },
);
