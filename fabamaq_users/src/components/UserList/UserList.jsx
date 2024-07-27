import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../../services/UserService.jsx';

const UserList = ({ searchTerm }) => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const userList = await fetchUsers();
                console.log('User list:', userList); // Log user list
                setUsers(Array.isArray(userList) ? userList : []);
            } catch (error) {
                setError('Error fetching users');
                console.error('Error fetching users:', error);
            }
        };

        getUsers();
    }, []);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {Array.isArray(filteredUsers) && filteredUsers.map(user => (
                    <li key={user.id}>
                        <Link to={`/user/${user.id}`}>{user.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;