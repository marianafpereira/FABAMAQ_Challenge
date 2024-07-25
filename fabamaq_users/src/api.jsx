export function createUser(user) {
    return fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
}
export function deleteUser(userId) {
    return fetch(`http://localhost:3001/users/${userId}`, {
        method: 'DELETE',
    });
}
export function getUser(userId) {
    return fetch(`http://localhost:3001/users/${userId}`);
}
export function getUsers() {
    return fetch('http://localhost:3001/users');
}
export function updateUser(userId, user) {
    return fetch(`http://localhost:3001/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
}