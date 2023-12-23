import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { TRAILER } from "../utilities/movieServices";

export const fetchTrailerApi = createAsyncThunk(
  "trailer/fetchTrailerApi",
  async (movieId) => {
    const response = await fetch(TRAILER(movieId));
    return await response.json();
  }
);

const initialState = {
  trailers: null,
  isError: false,
  isLoading: false,
};

const createTrailerSlice = createSlice({
  name: "trailer",
  initialState,

  extraReducers: (builder) =>
    builder
      .addCase(fetchTrailerApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTrailerApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trailers = action.payload;
      })
      .addCase(fetchTrailerApi.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      }),
});

export default createTrailerSlice.reducer;
