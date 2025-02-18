import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  isLoading: false,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTask: (state, action) => {
      state.tasks = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setTask, setIsLoading } = taskSlice.actions;

export default taskSlice.reducer;
