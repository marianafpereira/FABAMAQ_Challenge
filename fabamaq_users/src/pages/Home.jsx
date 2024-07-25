import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserList from './UserList';
import SearchBar from './SearchBar';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('https://gorest.co.in/public/v1/users')
            .then(response => {
                setUsers(response.data.data);
            });
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <SearchBar onSearchChange={handleSearchChange} />
            <UserList users={filteredUsers} />
        </div>
    );
};

export default Home;