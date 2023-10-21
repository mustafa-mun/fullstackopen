import { useSelector, useDispatch } from "react-redux";
import { voteAnectode } from "../reducers/anecdoteReducer";

const AnectodeList = () => {
  const anecdotes = useSelector((state) =>
    state.sort((a1, a2) =>
      a1.votes < a2.votes ? 1 : a1.votes > a2.votes ? -1 : 0
    )
  );
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAnectode(id));
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
