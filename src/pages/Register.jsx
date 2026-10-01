import { useState } from "react";
import { registerUser } from "../api/DataService";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    async function handleRegister(event) {
        event.preventDefault();

        try {
            setMessage("");
            setError("");

            const user = await registerUser({
                username: username,
                password: password,
            });

            setMessage(`Registration successful for ${user.username}!`);

            setUsername("");
            setPassword("");
        } catch (err) {
            setMessage("");
            setError(err.message);
        }
    }

    return (
        <main className="page-body">
            <h1>Register</h1>

            <p>Create an account to access the banking application.</p>

            <form onSubmit={handleRegister}>
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

                <button type="submit">Register</button>
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

export default Register;