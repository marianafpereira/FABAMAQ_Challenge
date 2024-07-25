import React, { useState } from 'react';
import { createUser, updateUser } from '../api';

const UserForm = ({ fetchUsers, userToEdit }) => {
    const [name, setName] = useState(userToEdit ? userToEdit.name : '');
    const [email, setEmail] = useState(userToEdit ? userToEdit.email : '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userToEdit) {
            await updateUser(userToEdit.id, { name, email });
        } else {
            await createUser({ name, email });
        }
        fetchUsers();
        setName('');
        setEmail('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button type="submit">{userToEdit ? 'Update' : 'Create'} User</button>
        </form>
    );
};

export default UserForm;
