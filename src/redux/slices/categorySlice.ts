import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // ...
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    // ...
  },
});

export const { actions } = categorySlice;
export default categorySlice.reducer;
