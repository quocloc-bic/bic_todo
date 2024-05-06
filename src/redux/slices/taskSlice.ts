import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // ...
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    // ...
  },
});

export const { actions } = taskSlice;
export default taskSlice.reducer;
