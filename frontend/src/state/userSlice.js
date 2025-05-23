// src/store/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUser, verifyUser } from "../utilities/serverCalls";

// Async thunk to login and receive token + user data
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ username, password, isUsernameSaved }, { rejectWithValue }) => {
    try {
      const { token, user } = await verifyUser(username, password);
      localStorage.setItem("token", token);
      if (isUsernameSaved) {
        localStorage.setItem("savedUsername", username);
      }
      return { token, user };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (_, { rejectWithValue }) => { 
    try {
      const updatedUser = await getUser();
      return updatedUser;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  localStorage.removeItem("token");
  return true;
});

const initialState = {
  token: localStorage.getItem("token") || null,
  user: null,
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
  selectedLanguage: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;

        const defaultLang = action.payload.user.my_languages?.find(
          (lang) => lang.is_default
        );

        state.selectedLanguage = defaultLang || null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      })
      // UPDATE USER
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;

        console.log("Updated User:", action.payload);
        const defaultLang = action.payload.my_languages?.find(
          (lang) => lang.is_default
        );

        console.log("Default Language:", defaultLang);
        state.selectedLanguage = defaultLang || null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setSelectedLanguage, setDefaultLanguage } = userSlice.actions;
export default userSlice.reducer;
