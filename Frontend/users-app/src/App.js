import './App.css';
import { CreateUser } from './CreateUser';
import { UsersList } from './UsersList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> Users Frontend </h1>
        <UsersList />
        <CreateUser />
      </header>
    </div>
  );
}

export default App;
