import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface DimensionsState {
  width: number | null;
  height: number | null;
}

const initialState: DimensionsState = {
  width: typeof window === "object" ? window.innerWidth : null,
  height: typeof window === "object" ? window.innerHeight : null,
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
