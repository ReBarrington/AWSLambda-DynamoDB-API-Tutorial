import './App.css';

export function UserCard(props) {

  return (
    <div className="UserCard">
        <p>{props.firstname} {props.lastname}</p>
    </div>
  );
}

