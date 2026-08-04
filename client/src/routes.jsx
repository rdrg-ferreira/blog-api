import App from './App.jsx'
import ErrorPage from './components/ErrorPage.jsx';
import MainLayout from './components/MainLayout.jsx';
import PostPage from './components/PostPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import SignupPage from './components/SignupPage.jsx';

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <MainLayout /> },
      { path: "post/:id", element: <PostPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
    ],
  }
];

export default routes;