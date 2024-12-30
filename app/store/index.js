// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import flashCard from "./flashCardSlice"; // Example slice

// Create and export the store
export const store = configureStore({
  reducer: {
    flashCard: flashCard,
  },
});
