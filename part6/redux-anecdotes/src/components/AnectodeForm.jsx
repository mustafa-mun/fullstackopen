import { useDispatch } from "react-redux";
import { appendAnectode } from "../reducers/anecdoteReducer";
import {
  setNotification,
  resetNotification,
} from "../reducers/notificationReducer";
import asObject from "../../utils/anectodeHelper";
import anectodeService from "../services/anectodeService";

const AnectodeForm = () => {
  const dispatch = useDispatch();

  const submitAnectode = (event) => {
    event.preventDefault();
    const newAnectode = asObject(event.target.anectode.value);
    anectodeService
      .create(newAnectode)
      .then(() => {
        dispatch(appendAnectode(newAnectode));
        dispatch(setNotification(`Anectode "${newAnectode.content}" is added`));
        setTimeout(() => {
          dispatch(resetNotification());
        }, 5000);
      })
      .catch((err) => console.log(err));
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
