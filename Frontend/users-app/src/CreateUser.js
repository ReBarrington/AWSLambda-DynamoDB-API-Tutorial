import { useState } from 'react';
import './App.css';

export function CreateUser() {

  const [newuser, setNewuser] = useState({
    firstname: "",
    lastname: ""
  })

  const handleChanges = event => {
    setNewuser({...newuser, [event.target.name]: event.target.value})
  }

  const submitForm = event => {
    event.preventDefault();
    //@TODO:  send newuser to database
    setNewuser({
      firstname: "",
      lastname: ""
    })
  }

  return (
    <div className="CreateUser">
        <h1>Create another User:</h1>
        <form onSubmit={submitForm}>
          <label htmlFor='firstname'>First Name:
          <input 
            type='text'
            name="firstname"
            value={newuser.firstname}
            onChange={handleChanges}
          />
          </label>
          <label htmlFor='lastname'>Last Name:
          <input 
            type='text'
            name="lastname"
            value={newuser.lastname}
            onChange={handleChanges}
          />
          </label>
          <button>Submit</button>
        </form>
    </div>
  );
}

