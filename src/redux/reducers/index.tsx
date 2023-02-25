import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UserState {
  fullName: string;
  userName: string;
  isAnAdministrator: boolean;
  id: number;
}

const initialState: UserState = {
  fullName: "",
  userName: "",
  isAnAdministrator: false,
  id: 0,
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
  },
});

export const { setUser } = userSlice.actions;

export const user = (state: RootState) => state.user;

export default userSlice.reducer;
