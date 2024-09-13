"use client";
import { createSlice } from "@reduxjs/toolkit";

export interface DesignState {
  title: string;
  description: string;
  imageUrl: string | null;
}

const initialState: DesignState = {
  title: "My Community",
  description:
    "This is a community for amazing people who want to grow their business. Chat business strategy, marketing, sales and more!",
  imageUrl:
    "https://res.cloudinary.com/diyfjjyzv/image/upload/v1726222397/mkhata4orrk7vbkemhos.jpg",
};

export const designSlice = createSlice({
  name: "design",
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setImageUrl: (state, action) => {
      state.imageUrl = action.payload;
    },
  },
});

export const { setTitle, setDescription, setImageUrl } = designSlice.actions;
export default designSlice.reducer;
