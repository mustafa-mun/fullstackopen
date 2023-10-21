import { useDispatch } from "react-redux";
import { createAnectode } from "../reducers/anecdoteReducer";
import {
  setNotification,
  resetNotification,
} from "../reducers/notificationReducer";

const AnectodeForm = () => {
  const dispatch = useDispatch();

  const submitAnectode = (event) => {
    event.preventDefault();
    const newAnectode = event.target.anectode.value;
    dispatch(createAnectode(newAnectode));
    dispatch(setNotification(`Anectode "${newAnectode}" is added`));
    setTimeout(() => {
      dispatch(resetNotification());
    }, 5000);
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
