// src/store/languageSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchVoices } from "../utilities/serverCalls";

// Async thunk to fetch all voices from OpenTTS
export const loadVoices = createAsyncThunk(
  "audio/loadVoices",
  async (_, { rejectWithValue }) => {
    try {
      const voices = await fetchVoices();
      return voices;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const audioSlice = createSlice({
  name: "audio",
  initialState: {
    voices: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadVoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadVoices.fulfilled, (state, action) => {
        state.loading = false;
        state.voices = action.payload;
      })
      .addCase(loadVoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default audioSlice.reducer;
