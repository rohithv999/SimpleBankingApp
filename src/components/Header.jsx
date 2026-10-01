import "./Header.css";

function Header({ setPage, loggedInUser, setLoggedInUser }) {

    function handleLogout() {
        setLoggedInUser(null);
        setPage("Home");
    }

    return (
        <header className="header">
            <div className="bank-name">
                Simple Banking Application
            </div>

            <nav className="navbar">
                <button onClick={() => setPage("Home")}>Home</button>
                <button onClick={() => setPage("About")}>About</button>
                <button onClick={() => setPage("Contact")}>Contact</button>
                <button onClick={() => setPage("Data")}>Data</button>

                {!loggedInUser && (
                    <button onClick={() => setPage("Register")}>
                        Register
                    </button>
                )}

                {loggedInUser ? (
                    <>
                        <span>
                            {loggedInUser.username} ({loggedInUser.role})
                        </span>

                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <button onClick={() => setPage("Login")}>
                        Login
                    </button>
                )}

                {loggedInUser?.role === "ADMIN" && (
                    <button onClick={() => setPage("Users")}>
                        Users
                    </button>
                )}
            </nav>
        </header>
    );
}

export default Header;