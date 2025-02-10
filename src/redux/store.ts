import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import verificationReducer from "./slices/verificationSlice";
import verificationTimerReducer from "./slices/verificationTimerSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      verification: verificationReducer,
      verificationTime: verificationTimerReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
