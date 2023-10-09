import { useState, useEffect } from "react";
import personService from "./services/persons";

const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <div>
      filter shown with{" "}
      <input value={newFilter} onChange={handleFilterChange} />
    </div>
  );
};

const PersonForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number:{" "}
        <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons, setPersons }) => {
  const handleDelete = (id, name) => {
    if (confirm(`Delete ${name} ?`)) {
      personService
        .deletePerson(id)
        .then(() => setPersons(persons.filter((person) => person.id !== id)))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      {persons.map((item, index) => {
        return (
          <p key={index}>
            {item.name} {item.number}{" "}
            <button onClick={() => handleDelete(item.id, item.name)}>
              delete
            </button>
          </p>
        );
      })}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const personsToShow = persons.filter((item) =>
    item.name.toLowerCase().includes(newFilter.toLowerCase())
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    for (const person of persons) {
      if (person.name === personObject.name) {
        if (
          confirm(
            `${personObject.name} is already added to the book, replace the old number with a new one?`
          )
        ) {
          personService
            .update(person.id, personObject)
            .then(() => {
              setPersons(
                persons.map((item) =>
                  item.id === person.id ? personObject : item
                )
              );
              setNewName("");
              setNewNumber("");
            })

            .catch((err) => console.log(err));
        }
        return;
      }
    }
    personService
      .create(personObject)
      .then((newPerson) => console.log(newPerson))
      .catch((err) => console.log(err));

    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        newFilter={newFilter}
        handleFilterChange={handleFilterChange}
      ></Filter>
      <h3>add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      ></PersonForm>
      <h3>Numbers</h3>
      <Persons persons={personsToShow} setPersons={setPersons}></Persons>
    </div>
  );
};

export default App;
