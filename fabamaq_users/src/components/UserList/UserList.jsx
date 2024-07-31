import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../../services/UserService.jsx';
import Loading from '../Loading/Loading';
import '../../styles/UserList.css';
import { GenderFemale, GenderMale, EnvelopeSimple, IdentificationCard } from "@phosphor-icons/react";

const UserList = ({ searchTerm }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUsers = async () => {
            setLoading(true);
            try {
                const userList = await fetchUsers();
                setUsers(Array.isArray(userList) ? userList : []);
            } catch (error) {
                setError('Error fetching users');
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            }
        };

        getUsers();
    }, []);

    const filteredUsers = users.filter(user => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
            user.name.toLowerCase().includes(searchTermLower) ||
            user.email.toLowerCase().includes(searchTermLower) ||
            (user.gender && user.gender.toLowerCase().startsWith(searchTermLower))
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
                        <td>
                            <span className="icon-text">
                                <IdentificationCard weight="duotone" color="var(--primary-color)" size={20} className="icon-left" />
                                <Link to={`/user/${user.id}`}>{user.name}</Link>
                            </span>
                        </td>
                        <td>
                            <span className="icon-text">
                                {user.gender.toLowerCase() === 'female' ? (
                                    <GenderFemale weight="duotone" color="var(--primary-color)" size={20} className="icon-left" />
                                ) : (
                                    <GenderMale weight="duotone" color="var(--primary-color)" size={20} className="icon-left" />
                                )}
                                {user.gender}
                            </span>
                        </td>
                        <td>
                            <span className="icon-text">
                                <EnvelopeSimple weight="duotone" color="var(--primary-color)" size={20} className="icon-left" />
                                {user.email}
                            </span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;