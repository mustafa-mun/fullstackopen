import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    set(state, action) {
      return action.payload;
    },
    reset() {
      return "";
    },
  },
});

export const { set, reset } = notificationSlice.actions;

export const setNotification = (message, seconds) => {
  return (dispatch) => {
    dispatch(set(message));
    setTimeout(() => {
      dispatch(reset());
    }, seconds * 1000);
  };
};

export default notificationSlice.reducer;
