import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userId: 1,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userplusone: (state) => {
      state.userId += 1;
    },
    userminusone: (state) => {
      state.userId -= 1;
    },
  },
});
// const userreducer = userslice.reducers;

// export default userreducer;
// export const { userplusone, userminusone } = userslice.actions;
export const { userplusone, userminusone } = userSlice.actions;
export default userSlice.reducer;
