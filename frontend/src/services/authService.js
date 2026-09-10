export async function signin(email, password) {
    return fetch("http://localhost:8080/auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });
}

export async function signup(name, email, password) { 
    return fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            email,
            password,
        }),
    });
}