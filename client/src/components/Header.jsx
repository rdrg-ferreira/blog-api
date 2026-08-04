import { Link } from "react-router";

function LogoutButton({ setCurrentUser }) {
    const handleLogout = () => {
        localStorage.removeItem('token');
        setCurrentUser(null);
    };

    return (
        <button onClick={handleLogout} className="logout-button">
            Logout
        </button>
    );
}

export default function Header({ loggedIn, setCurrentUser }) {
    return (
        <header className="flex space-between">
            <Link to="/">
                <h1>Blog</h1>
            </Link>
            {loggedIn ? (
                <LogoutButton setCurrentUser={setCurrentUser}></LogoutButton>
            ) : (
                <div className="actions">
                    <Link to="/login" className="button">Login</Link>
                    <Link to="/signup" className="button">Sign Up</Link>
                </div>
            )}
        </header>
    );
}