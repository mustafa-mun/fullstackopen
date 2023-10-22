import { createSlice } from "@reduxjs/toolkit";
import anectodeService from "../services/anectodeService";
import asObject from "../../utils/anectodeHelper";

const anecdoteSlice = createSlice({
  name: "anectode",
  initialState: [],
  reducers: {
    vote(state, action) {
      return state.map((anc) => {
        if (anc.id === action.payload.id) {
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

export const { appendAnectode, vote, setAnectodes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anectodeService.getAll();
    dispatch(setAnectodes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anectodeService.create(asObject(content));
    dispatch(appendAnectode(newAnecdote));
  };
};

export const voteAnecdote = (body) => {
  return async (dispatch) => {
    await anectodeService.update({ ...body, votes: body.votes + 1 });
    dispatch(vote(body));
  };
};

export default anecdoteSlice.reducer;
