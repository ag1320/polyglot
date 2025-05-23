import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import languageReducer from "./languageSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    languages: languageReducer,
  },
});

export default store;



