// src/store/languageSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchLanguages } from "../utilities/serverCalls";

// Async thunk to fetch all languages
export const loadLanguages = createAsyncThunk(
  "languages/loadLanguages",
  async (_, { rejectWithValue }) => {
    try {
      const languages = await fetchLanguages();
      return languages;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const languageSlice = createSlice({
  name: "languages",
  initialState: {
    allLanguages: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadLanguages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadLanguages.fulfilled, (state, action) => {
        state.loading = false;
        state.allLanguages = action.payload;
      })
      .addCase(loadLanguages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default languageSlice.reducer;
