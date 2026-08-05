import { Link, useLocation } from "react-router";
import "../styles/Header.css";
import "../styles/globalStyle.css";

function LogoutButton({ setCurrentUser }) {
    const handleLogout = () => {
        localStorage.removeItem('token');
        setCurrentUser(null);
    };

    return (
        <button onClick={handleLogout} className="button" id="logout-button">
            Logout
        </button>
    );
}

export default function Header({ loggedIn, setCurrentUser }) {
    const location = useLocation();

    return (
        <header className="flex space-between">
            <Link to="/">
                <h1>Blog</h1>
            </Link>
            {loggedIn ? (
                <LogoutButton setCurrentUser={setCurrentUser}></LogoutButton>
            ) : (
                <div className="actions flex">
                    <Link to="/login" state={{ from: location }} className="button">Login</Link>
                    <Link to="/signup" className="button">Sign Up</Link>
                </div>
            )}
        </header>
    );
}