import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import languageReducer from "./languageSlice";
import audioReducer from "./audioSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    languages: languageReducer,
    audio: audioReducer,
  },
});

export default store;



