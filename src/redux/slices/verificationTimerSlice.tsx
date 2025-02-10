import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VerificationState {
  cooldownEndTime: number | null;
}

const initialState: VerificationState = {
  cooldownEndTime: null,
};

export const verificationTimerSlice = createSlice({
  name: "verification",
  initialState,
  reducers: {
    setCooldown: (state, action: PayloadAction<number>) => {
      state.cooldownEndTime = Date.now() + action.payload * 1000;
    },
    clearCooldown: (state) => {
      state.cooldownEndTime = null;
    },
  },
});

export const { setCooldown, clearCooldown } = verificationTimerSlice.actions;
export default verificationTimerSlice.reducer;
