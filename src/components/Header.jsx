import "./Header.css";

function Header({ setPage }) {
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
            </nav>
        </header>
    );
}

export default Header;