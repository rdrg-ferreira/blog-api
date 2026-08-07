import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import Header from './components/Header';
import authFetch from './lib/authFetch';

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('currentUser');

    if (!token) {
      localStorage.removeItem('currentUser');
      return null;
    }

    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  useEffect(() => {
    let ignore = false;

    async function fetchPosts() {
      const response = await authFetch('/api/v1/posts');
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
