export function createUser(user) {
    return fetch('https://gorest.co.in/public/v2/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
}
export function deleteUser(userId) {
    return fetch(`https://gorest.co.in/public/v2/users/${userId}`, {
        method: 'DELETE',
    });
}
export function getUser(userId) {
    return fetch(`https://gorest.co.in/public/v2/users/${userId}`, {
        method: 'GET',    });
}
export function getUsers() {
    return fetch('https://gorest.co.in/public/v2/users',{
    method: 'GET',
    });
}
export function updateUser(userId, user) {
    return fetch(`https://gorest.co.in/public/v2/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
}