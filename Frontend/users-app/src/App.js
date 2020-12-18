
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CreateUser } from './CreateUser';
import { UsersList } from './UsersList';
import './App.css';


function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
      axios.get('https://34vf1cc5td.execute-api.us-east-1.amazonaws.com/test/user')
      .then(response => {
        setUsers(response.data.body)
        console.log(response.data, ' is response.data')
      })
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <h1> Users Frontend </h1>
        <UsersList users={users}/>
        <CreateUser />
      </header>
    </div>
  );
}

export default App;
