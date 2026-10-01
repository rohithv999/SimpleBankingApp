const BASE_URL = "http://localhost:8080/api";

export async function getCustomers() {
    const response = await fetch(`${BASE_URL}/customers`);

    if (!response.ok) {
        throw new Error("Failed to load customers");
    }

    return response.json();
}

export async function getAccounts() {
    const response = await fetch(`${BASE_URL}/accounts`);

    if (!response.ok) {
        throw new Error("Failed to load accounts");
    }

    return response.json();
}

export async function createCustomer(customer) {
    const response = await fetch(`${BASE_URL}/customers`, {
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
    const response = await fetch(`${BASE_URL}/customers/${id}`, {
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
    const response = await fetch(`${BASE_URL}/customers/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete customer");
    }
}