import './App.css';
import { UserCard } from './UserCard';

export function UsersList(props) {

  return (
    <div className="UsersList">
        <h1>Current Users:</h1>
        {props.users.map(user => (
          <UserCard key={user.id} firstname={user.firstname} lastname={user.lastname} />
        ))}
    </div>
  );
}

