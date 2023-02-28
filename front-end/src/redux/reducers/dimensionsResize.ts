import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface DimensionsState {
  width: number;
  height: number;
}

const initialState: DimensionsState = {
  width: typeof window === "object" ? window.innerWidth : 0,
  height: typeof window === "object" ? window.innerHeight : 0,
};

export const dimensionsSlice = createSlice({
  name: "widthResize",
  initialState,
  reducers: {
    setDimensions: (state, action) => {
      state.height = action.payload.height;
      state.width = action.payload.width;
    },
  },
});

export const { setDimensions } = dimensionsSlice.actions;

export const dimensions = (state: RootState) => state.user;

export default dimensionsSlice.reducer;
