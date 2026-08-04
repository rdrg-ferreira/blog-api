import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import Header from './components/Header';

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('token');
    return storedUser ?? null;
  });
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let ignore = false;

    async function fetchPosts() {
      const response = await fetch('/api/v1/posts');
      const data = await response.json();
      if (!ignore) setPosts(data);
    }

    fetchPosts();

    return () => {
      ignore = true;
    };
  }, []);
  
  return (
    <>
      <Header loggedIn={Boolean(currentUser)} setCurrentUser={setCurrentUser}></Header>
      <Outlet context={{ currentUser, setCurrentUser, posts, setPosts }}></Outlet>
    </>
  )
}

export default App
