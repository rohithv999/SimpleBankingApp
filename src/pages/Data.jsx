import { useEffect, useState } from "react";
import { getCustomers, getCustomerById, getAccounts, createCustomer, updateCustomer, deleteCustomer, findCustomersByFirstName } from "../api/DataService";

function Data() {
    const [customers, setCustomers] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(true);

    const [customerId, setCustomerId] = useState("");
    const [customerName, setCustomerName] = useState("");

    const [searchId, setSearchId] = useState("");
    const [foundCustomer, setFoundCustomer] = useState(null);

    const [searchError, setSearchError] = useState("");

    const [firstName, setFirstName] = useState("");
    const [nameResults, setNameResults] = useState([]);
    const [nameSearchMessage, setNameSearchMessage] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            setLoading(true);
            setError("");

            const customerData = await getCustomers();
            const accountData = await getAccounts();

            setCustomers(customerData);
            setAccounts(accountData);
        } catch (err) {
            setError("Unable to load banking data.");
            console.error(err);
        } finally {
            setLoading(false);
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
                id: customer.id,
                name: newName,
                accounts: customer.accounts || [],
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

    async function handleSearchCustomer(event) {
        event.preventDefault();

        try {
            setSearchError("");
            setFoundCustomer(null);

            const customer = await getCustomerById(searchId);

            setFoundCustomer(customer);
        } catch (err) {
            setFoundCustomer(null);
            setSearchError(`Customer with ID ${searchId} was not found.`);
            console.error(err);
        }
    }

    async function handleFirstNameSearch(event) {
        event.preventDefault();

        try {
            setNameSearchMessage("");
            setNameResults([]);

            const results = await findCustomersByFirstName(firstName);

            if (results.length === 0) {
                setNameSearchMessage(
                    `No customers found with first name "${firstName}".`
                );
            } else {
                setNameResults(results);
            }
        } catch (err) {
            setNameSearchMessage("Unable to search for customers.");
            console.error(err);
        }
    }

    return (
        <main className="page-body">
            <h1>Banking Data</h1>

            {loading && <p>Loading banking data...</p>}

            {error && <p className="error-message">{error}</p>}

            <h2>Customers</h2>

            <h3>Find Customer By ID</h3>

            <form onSubmit={handleSearchCustomer}>
                <input
                    type="number"
                    placeholder="Customer ID"
                    value={searchId}
                    onChange={(event) => setSearchId(event.target.value)}
                    required
                />

                <button type="submit">Search</button>
            </form>

            {searchError && (
                <p className="error-message">{searchError}</p>
            )}

            {foundCustomer && (
                <div>
                    <p>
                        <strong>Customer ID:</strong> {foundCustomer.id}
                    </p>

                    <p>
                        <strong>Name:</strong> {foundCustomer.name}
                    </p>
                </div>
            )}

            <h3>Find Customer By First Name</h3>

            <form onSubmit={handleFirstNameSearch}>
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    required
                />

                <button type="submit">Search</button>
            </form>

            {nameSearchMessage && (
                <p>{nameSearchMessage}</p>
            )}

            {nameResults.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Customer ID</th>
                            <th>Name</th>
                        </tr>
                    </thead>

                    <tbody>
                        {nameResults.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.id}</td>
                                <td>{customer.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

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

            {!loading && customers.length === 0 ? (
                <p>No customers found.</p>
            ) : !loading ? (
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
                                    <button type="button" onClick={() => handleUpdateCustomer(customer)}>
                                        Edit
                                    </button>

                                    <button type="button" onClick={() => handleDeleteCustomer(customer.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : null}

            <h2>Accounts</h2>

            {!loading && accounts.length === 0 ? (
                <p>No accounts found.</p>
            ) : !loading ? (
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
            ) : null}
        </main>
    );
}

export default Data;