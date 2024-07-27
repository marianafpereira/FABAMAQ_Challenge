import {API_KEY} from "./urls.js";

export const handleSubmit = async (e, user, setUser, setMessage) => {
    e.preventDefault();
    try {
        const response = await fetch('https://gorest.co.in/public/v2/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify(user)
        });
        if (response.ok) {
            setMessage('User created successfully!');
            setUser({ name: '', email: '', gender: '', status: 'active' });
        } else {
            const errorData = await response.json();
            setMessage(`Failed to create user: ${errorData.map(err => `${err.field}: ${err.message}`).join(', ')}`);
        }
    } catch (error) {
        setMessage('An error occurred.');
    }
};