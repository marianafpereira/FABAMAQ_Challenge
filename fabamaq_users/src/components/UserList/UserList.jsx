import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../../services/UserService.jsx';
import Loading from '../Loading/Loading';
import '../../styles/UserList.css';

const UserList = ({ searchTerm }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
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

    const filteredUsers = users.filter(user => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
            user.name.toLowerCase().includes(searchTermLower) ||
            user.email.toLowerCase().includes(searchTermLower) ||
            (user.gender && user.gender.toLowerCase() === searchTermLower)
        );
    });

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="user-list-container">
            <table className="user-list-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {Array.isArray(filteredUsers) && filteredUsers.map(user => (
                    <tr key={user.id}>
                        <td><Link to={`/user/${user.id}`}>{user.name}</Link></td>
                        <td>{user.gender}</td>
                        <td>{user.email}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;