const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://h746g6dyc4.execute-api.us-east-1.amazonaws.com/api";

export async function getCustomers() {
    const response = await fetch(`${API_URL}/customers`);

    if (!response.ok) {
        throw new Error("Failed to load customers");
    }

    return response.json();
}

export async function getCustomerById(id) {
    const response = await fetch(`${API_URL}/customers/${id}`);

    if (!response.ok) {
        throw new Error("Customer not found");
    }

    return response.json();
}

export async function getAccounts() {
    const response = await fetch(`${API_URL}/accounts`);

    if (!response.ok) {
        throw new Error("Failed to load accounts");
    }

    return response.json();
}

export async function createCustomer(customer) {
    const response = await fetch(`${API_URL}/customers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
    });

    if (!response.ok) {
        throw new Error("Failed to create customer");
    }

    return response.json();
}

export async function updateCustomer(id, customer) {
    const response = await fetch(`${API_URL}/customers/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
    });

    if (!response.ok) {
        throw new Error("Failed to update customer");
    }

    return response.json();
}

export async function deleteCustomer(id) {
    const response = await fetch(`${API_URL}/customers/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete customer");
    }
}

export async function findCustomersByFirstName(firstName) {
    const response = await fetch(
        `${API_URL}/customers/search?firstName=${encodeURIComponent(firstName)}`
    );

    if (!response.ok) {
        throw new Error("Failed to search customers");
    }

    return response.json();
}

export async function registerUser(user) {
    const response = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Registration failed");
    }

    return response.json();
}

export async function loginUser(user) {
    const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Login failed");
    }

    return response.json();
}

export async function getUsers() {
    const response = await fetch(`${API_URL}/users`);

    if (!response.ok) {
        throw new Error("Failed to load users");
    }

    return response.json();
}