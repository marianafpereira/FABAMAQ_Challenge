import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSubmit } from '../services/NewUserService';
import ErrorPage from './Status/ErrorPage';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';

const NewUserPage = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        gender: '',
        status: 'active'
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleSubmit(e, user, setUser, setMessage, navigate);
        } catch (error) {
            console.error('Error creating user:', error);
            setError(error.message);
        }
    };

    if (error) {
        return <ErrorPage customError={error} />;
    }

    return (
        <div className="new-user-page">
            <Breadcrumb />
            <h2>Create New User</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Gender:</label>
                    <select
                        name="gender"
                        value={user.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <button type="submit">Create User</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default NewUserPage;