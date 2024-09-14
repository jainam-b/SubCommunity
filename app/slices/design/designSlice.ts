"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DesignState {
  title: string;
  description: string;
  imageUrl: string | null;
  hasChange: boolean;
  history: {
    title: string;
    description: string;
  }[]; // Store past states excluding imageUrl
}

const initialState: DesignState = {
  title: "My Community",
  description:
    "This is a community for amazing people who want to grow their business. Chat business strategy, marketing, sales, and more!",
  imageUrl:
    "https://res.cloudinary.com/diyfjjyzv/image/upload/v1726222397/mkhata4orrk7vbkemhos.jpg",
  hasChange: false,
  history: [], // Start with an empty history
};

export const designSlice = createSlice({
  name: "design",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.history.push({
        title: state.title,
        description: state.description,
      }); // Save current state to history

      state.title = action.payload;
      
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.history.push({
        title: state.title,
        description: state.description,
      }); // Save current state to history

      state.description = action.payload;
      
    },
    setImageUrl: (state, action: PayloadAction<string | null>) => {
      state.imageUrl = action.payload;
      
    },
    setHasChanged: (state, action: PayloadAction<boolean>) => {
      state.hasChange = action.payload;
    },
    undo: (state) => {
      if (state.history.length > 0) {
        const lastState = state.history.pop(); // Get the last state from history
        if (lastState) {
          state.title = lastState.title;
          state.description = lastState.description;
        }
        state.hasChange = true;
      }
    },
  },
});

export const { setTitle, setDescription, setImageUrl, setHasChanged, undo } =
  designSlice.actions;

export default designSlice.reducer;
