import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UserState {
  fullName: string;
  userName: string;
  isAnAdministrator: boolean;
  id: number;
}

const userLocalStorage = JSON.parse(localStorage.getItem("user") || "{}");

const initialState: UserState = {
  fullName: userLocalStorage?.fullName || "",
  userName: userLocalStorage?.userName || "",
  isAnAdministrator: userLocalStorage?.isAnAdministrator || false,
  id: userLocalStorage?.id || 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.fullName = action.payload.fullName;
      state.userName = action.payload.userName;
      state.isAnAdministrator = action.payload.isAnAdministrator;
      state.id = action.payload.id;
    },
    clearUser: (state) => {
      state.fullName = "";
      state.userName = "";
      state.isAnAdministrator = false;
      state.id = 0;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const user = (state: RootState) => state.user;

export default userSlice.reducer;
