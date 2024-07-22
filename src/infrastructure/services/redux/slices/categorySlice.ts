import { ICategory } from '@bic_todo/domain/entities/category';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CategoryState {
  categories: ICategory[];
}

const initialState: CategoryState = {
  categories: [],
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    addCategory(state, action: PayloadAction<ICategory>) {
      state.categories.push(action.payload);
    },
    updateCategory(state, action: PayloadAction<ICategory>) {
      const { id } = action.payload;
      const existingCategory = state.categories.find(
        category => category.id === id,
      );
      if (existingCategory) {
        Object.assign(existingCategory, action.payload);
      }
    },
    deleteCategory(state, action: PayloadAction<number>) {
      const idToDelete = action.payload;
      state.categories = state.categories.filter(
        category => category.id !== idToDelete,
      );
    },
    setCategories(state, action: PayloadAction<ICategory[]>) {
      state.categories = action.payload;
    },
  },
});

export const ReduxCategoryActions = categorySlice.actions;

export default categorySlice.reducer;
