import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../reducers/users";
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    user: userSlice,
  },
  middleware: (middleware) => middleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
