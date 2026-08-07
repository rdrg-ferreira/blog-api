import { Link } from "react-router";
import "../styles/ErrorPage.css";
import "../styles/globalStyle.css";

const ErrorPage = () => {
  return (
    <h1 className="information">Oh no, this route doesn't exist! You can go back to the home page by clicking <Link to="/">here</Link></h1>
  );
};

export default ErrorPage;
