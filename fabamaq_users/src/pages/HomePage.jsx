import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import BaseLayout from '../components/BaseLayout/BaseLayout';
import Footer from '../components/Footer/Footer';
import SectionHeading from '../components/Headings/SectionHeading';
import './HomePage.css';
import { getUserBySearchTerm } from "../services/UserService.jsx";
import UserList from "../components/UserList/UserList.jsx";

const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = async () => {
        if (searchTerm) {
            try {
                const user = await getUserBySearchTerm(searchTerm);
                if (user && user.id) {
                    navigate(`/user/${user.id}`);
                } else {
                    console.error('User not found');
                }
            } catch (error) {
                console.error('Error fetching user by search term:', error);
            }
        }
    };

    return (
        <BaseLayout pageTitle="Welcome to ">
            <div className="home-page">
                <SectionHeading text="FABAMAQ Challenge"/>
                <div className="search-container">
                    <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange}
                               onSearchSubmit={handleSearchSubmit}/>
                </div>
                <UserList searchTerm={searchTerm}/>
                <p className="register-link">
                    Not registered? <a href="/new-user">Create an account.</a>
                </p>
            </div>
            <Footer/>
        </BaseLayout>
    );
}

export default HomePage;