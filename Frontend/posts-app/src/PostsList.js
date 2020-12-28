import './App.css';
import { Post } from './Post';

export function PostsList(props) {

  return (
    <div className="PostsList">
        <h1>Current Posts:</h1>
        {props.posts.map(Post => (
          <Post key={Post.id} />
        ))}
    </div>
  );
}

