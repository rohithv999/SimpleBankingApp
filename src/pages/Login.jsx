import { useState } from "react";
import { loginUser } from "../api/DataService";

function Login({ setLoggedInUser }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    async function handleLogin(event) {
        event.preventDefault();

        try {
            setMessage("");
            setError("");

            const user = await loginUser({
                username: username,
                password: password,
            });

            setLoggedInUser(user);

            setMessage(
                `Welcome ${user.username}! You are logged in as ${user.role}.`
            );

            setUsername("");
            setPassword("");
        } catch (err) {
            setMessage("");
            setError(err.message);
        }
    }

    return (
        <main className="page-body">
            <h1>Login</h1>

            <p>Login to your banking account.</p>

            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />

                <button type="submit">Login</button>
            </form>

            {message && <p>{message}</p>}

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}
        </main>
    );
}

export default Login;