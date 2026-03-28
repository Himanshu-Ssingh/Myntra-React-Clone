import { createSlice } from "@reduxjs/toolkit";


const fetchStatusSlice = createSlice({
  name: "fetchStatus",
  initialState: {
    fetchDone: false, // false: pending, true: done
    currentlyFetching: false,
  },
  reducers: {
    markFetchingStarted: (state) => {
      state.currentlyFetching = true;
      state.fetchDone = false;
    },
    markFetchDone: (state) => {
      state.currentlyFetching = false;
      state.fetchDone = true;
    },
    markFetchingFinished: (state) => {
      state.currentlyFetching = false;
    },
  },
});

export const fetchStatusActions  = fetchStatusSlice.actions;
export default fetchStatusSlice;
