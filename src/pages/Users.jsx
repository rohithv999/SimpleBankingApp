import { useEffect, useState } from "react";
import { getUsers } from "../api/DataService";

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadUsers();
    }, []);

    async function loadUsers() {
        try {
            setLoading(true);
            setError("");

            const userData = await getUsers();
            setUsers(userData);
        } catch (err) {
            setError("Unable to load users.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="page-body">
            <h1>Users</h1>

            {loading && <p>Loading users...</p>}

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            {!loading && users.length === 0 ? (
                <p>No users found.</p>
            ) : !loading ? (
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Role</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr key={user.username}>
                                <td>{user.username}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : null}
        </main>
    );
}

export default Users;