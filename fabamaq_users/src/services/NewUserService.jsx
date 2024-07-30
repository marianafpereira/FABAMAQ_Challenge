import { API_KEY } from '../data/urls.js';

export const handleSubmit = async (e, user, setUser, navigate) => {
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

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create user due to email or username being already in use.');
        }
        const data = await response.json();
        setUser(data);
    } catch (error) {
        throw error;
    }
};