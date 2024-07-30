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

const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
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
                <SectionHeading text="User List"/>
                <div className="search-container">
                    <SearchBar
                        searchTerm={searchTerm}
                        onSearchChange={handleSearchChange}
                    />
                </div>
                <UserList searchTerm={searchTerm} />
                <p className="register-link">
                    Not registered? <a href="/new-user">Create an account.</a>
                </p>
            </div>
            <Footer/>
        </BaseLayout>
    );
}

export default HomePage;