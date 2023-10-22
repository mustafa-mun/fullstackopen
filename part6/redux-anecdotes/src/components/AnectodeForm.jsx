import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnectodeForm = () => {
  const dispatch = useDispatch();

  const submitAnectode = (event) => {
    event.preventDefault();
    const newAnecdote = event.target.anectode.value;
    dispatch(createAnecdote(newAnecdote));
    dispatch(setNotification(`Anectode "${newAnecdote}" is added`, 5));
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submitAnectode}>
        <div>
          <input name="anectode" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnectodeForm;
