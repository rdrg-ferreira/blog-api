import App from './App.jsx'
import ErrorPage from './components/ErrorPage.jsx';
import MainLayout from './components/MainLayout.jsx';
import PostPage from './components/PostPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import SignupPage from './components/SignupPage.jsx';
import CreatePostPage from './components/CreatePostPage.jsx';
import RequireAdmin from './components/RequireAdmin.jsx';

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "login", element: <LoginPage /> },
      {
        element: <RequireAdmin />,
        children: [
          { index: true, element: <MainLayout /> },
          { path: "post/:id", element: <PostPage /> },
          { path: "signup", element: <SignupPage /> },
          { path: "create-post", element: <CreatePostPage /> },
        ],
      },
    ],
  }
];

export default routes;