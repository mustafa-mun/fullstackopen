import { useEffect } from "react";
import AnectodeForm from "./components/AnectodeForm";
import AnectodeList from "./components/AnectodeList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { useDispatch } from "react-redux";
import anectodeService from "./services/anectodeService";
import { setAnectodes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    anectodeService
      .getAll()
      .then((anectodes) => {
        dispatch(setAnectodes(anectodes));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification></Notification>
      <Filter></Filter>
      <AnectodeList></AnectodeList>
      <AnectodeForm></AnectodeForm>
    </div>
  );
};

export default App;
