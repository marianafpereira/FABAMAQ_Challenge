import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBar.jsx';
import BaseLayout from '../components/BaseLayout/BaseLayout';
import Footer from '../components/Footer/Footer';
import SectionHeading from '../components/Headings/SectionHeading';
import '../styles/HomePage.css';
import '../styles/index.css';
import UserList from "../components/UserList/UserList.jsx";
import Loading from '../components/Loading/Loading.jsx';
import ErrorPage from './Status/ErrorPage.jsx';
import { UserList as UserListIcon } from "@phosphor-icons/react";

const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCreateAccountClick = () => {
        navigate('/new-user');
    };
    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorPage customError={error} />;
    }

    return (
        <BaseLayout pageTitle="Welcome to " subtitle="FABAMAQ Challenge">
            <div className="home-page">
                <div className="section-heading">
                    <UserListIcon weight="duotone" color="var(--primary-color)" size={50} className="icon-left"/>
                    <SectionHeading text="All Users"/>
                </div>
                <div className="search-container">
                    <SearchBar
                        searchTerm={searchTerm}
                        onSearchChange={handleSearchChange}
                    />
                    <div className="register-link">
                        <button onClick={handleCreateAccountClick}>Create User</button>
                    </div>
                </div>
                <UserList searchTerm={searchTerm}/>
            </div>
            <Footer/>
        </BaseLayout>
    );
}

export default HomePage;