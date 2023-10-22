import { useSelector, useDispatch } from "react-redux";
import { voteAnectode } from "../reducers/anecdoteReducer";
import {
  setNotification,
  resetNotification,
} from "../reducers/notificationReducer";
import { createSelector } from "@reduxjs/toolkit";

const AnectodeList = () => {
  const filteredAndSortedAnecdotesSelector = createSelector(
    (state) => state.anectodes,
    (state) => state.filter,
    (anectodes, filter) => {
      return anectodes
        .filter((anc) => anc.content.toLowerCase().includes(filter))
        .sort((a1, a2) =>
          a1.votes < a2.votes ? 1 : a1.votes > a2.votes ? -1 : 0
        );
    }
  );

  const anecdotes = useSelector((state) =>
    filteredAndSortedAnecdotesSelector(state)
  );
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAnectode(id));
    dispatch(
      setNotification(
        `you voted "${anecdotes.find((anc) => anc.id === id).content}"`
      )
    );
    setTimeout(() => {
      dispatch(resetNotification());
    }, 5000);
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnectodeList;
