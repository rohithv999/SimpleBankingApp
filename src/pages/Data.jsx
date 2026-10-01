import { useEffect, useState } from "react";
import { getCustomers, getAccounts, createCustomer, updateCustomer, deleteCustomer } from "../api/DataService";

function Data() {
    const [customers, setCustomers] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [customerName, setCustomerName] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            const customerData = await getCustomers();
            const accountData = await getAccounts();

            setCustomers(customerData);
            setAccounts(accountData);
        } catch (err) {
            setError("Unable to load banking data.");
            console.error(err);
        }
    }

    async function handleCreateCustomer(event) {
        event.preventDefault();

        try {
            await createCustomer({
                id: Number(customerId),
                name: customerName,
                accounts: [],
            });

            setCustomerId("");
            setCustomerName("");

            await loadData();
        } catch (err) {
            setError("Unable to create customer.");
            console.error(err);
        }
    }

    async function handleUpdateCustomer(customer) {
        const newName = window.prompt(
            "Enter the customer's new name:",
            customer.name
        );

        if (!newName) {
            return;
        }

        try {
            await updateCustomer(customer.id, {
                name: newName,
            });

            await loadData();
        } catch (err) {
            setError("Unable to update customer.");
            console.error(err);
        }
    }

    async function handleDeleteCustomer(id) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this customer?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteCustomer(id);
            await loadData();
        } catch (err) {
            setError("Unable to delete customer.");
            console.error(err);
        }
    }

    return (
        <main className="page-body">
            <h1>Banking Data</h1>

            {error && <p>{error}</p>}

            <h2>Customers</h2>

            <form onSubmit={handleCreateCustomer}>
                <input
                    type="number"
                    placeholder="Customer ID"
                    value={customerId}
                    onChange={(event) => setCustomerId(event.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Customer Name"
                    value={customerName}
                    onChange={(event) => setCustomerName(event.target.value)}
                    required
                />

                <button type="submit">Add Customer</button>
            </form>

            {customers.length === 0 ? (
                <p>No customers found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Customer ID</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.id}</td>
                                <td>{customer.name}</td>

                                <td>
                                    <button onClick={() => handleUpdateCustomer(customer)}>
                                        Edit
                                    </button>

                                    <button onClick={() => handleDeleteCustomer(customer.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <h2>Accounts</h2>

            {accounts.length === 0 ? (
                <p>No accounts found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Account ID</th>
                            <th>Account Type</th>
                            <th>Balance</th>
                        </tr>
                    </thead>

                    <tbody>
                        {accounts.map((account) => (
                            <tr key={account.accountId}>
                                <td>{account.accountId}</td>
                                <td>{account.accountType}</td>
                                <td>${account.balance.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </main>
    );
}

export default Data;