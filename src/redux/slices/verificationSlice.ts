import { createSlice } from "@reduxjs/toolkit";

interface VerificationState {
  isVerificationSuccess: boolean;
}

const initialState: VerificationState = {
  isVerificationSuccess: false,
};

const verificationSlice = createSlice({
  name: "verification",
  initialState,
  reducers: {
    setVerificationSuccess: (state) => {
      state.isVerificationSuccess = true;
    },
    resetVerificationState: (state) => {
      state.isVerificationSuccess = false;
    },
  },
});

export const { setVerificationSuccess, resetVerificationState } =
  verificationSlice.actions;
export default verificationSlice.reducer;
