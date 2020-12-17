import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { UserCard } from './UserCard';

export function UsersList() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('https://34vf1cc5td.execute-api.us-east-1.amazonaws.com/test/user')
        .then(response => {
          setUsers(response.data.body)
          console.log(response.data, ' is response.data')
        })
    }, []);

  return (
    <div className="UsersList">
        <h1>Current Users:</h1>
        {users.map(user => (
          <UserCard key={user.id} firstname={user.firstname} lastname={user.lastname} />
        ))}
    </div>
  );
}

