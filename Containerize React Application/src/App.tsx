import { useState, useEffect } from "react";

export interface Post {
  id: number;
  title: String;
  body: String;
}
function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
      .then((responce) => responce.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <>
      <h1>Vite and React and Docker after adding docker volumes</h1>
      <div>
        <h2>Posts</h2>
        <ul>
          {posts.map((post: Post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
