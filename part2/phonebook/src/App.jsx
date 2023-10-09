import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
    };

    for (const person of persons) {
      if (person.name === personObject.name) {
        alert(`${newName} is already added to phonebook`);
        return;
      }
    }

    setPersons(persons.concat(personObject));
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((item, index) => {
          return <p key={index}>{item.name}</p>;
        })}
      </div>
    </div>
  );
};

export default App;
