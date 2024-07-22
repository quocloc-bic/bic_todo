import { combineSlices } from '@reduxjs/toolkit';
import taskSlice from './slices/taskSlice';
import categorySlice from './slices/categorySlice';

const rootReducer = combineSlices({
  task: taskSlice,
  category: categorySlice,
});

export default rootReducer;
