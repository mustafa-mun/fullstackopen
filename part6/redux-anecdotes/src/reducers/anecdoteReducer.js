import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: "anectode",
  initialState: [],
  reducers: {
    voteAnectode(state, action) {
      return state.map((anc) => {
        if (anc.id === action.payload) {
          return { ...anc, votes: anc.votes + 1 };
        }
        return anc;
      });
    },
    appendAnectode(state, action) {
      state.push(action.payload);
    },
    setAnectodes(state, action) {
      return action.payload;
    },
  },
});

export const { appendAnectode, voteAnectode, setAnectodes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
