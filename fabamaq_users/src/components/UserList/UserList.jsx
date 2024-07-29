import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../../services/UserService.jsx';
import Loading from '../Loading/Loading';

const UserList = ({ searchTerm }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUsers = async () => {
            setLoading(true);
            try {
                const userList = await fetchUsers();
                console.log('User list:', userList);
                setUsers(Array.isArray(userList) ? userList : []);
            } catch (error) {
                setError('Error fetching users');
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        getUsers();
    }, []);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
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