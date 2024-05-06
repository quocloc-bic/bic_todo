import { combineReducers } from '@reduxjs/toolkit';
import taskSlice from './slices/taskSlice';
import categorySlice from './slices/categorySlice';

const rootReducer = combineReducers({
  task: taskSlice,
  category: categorySlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
