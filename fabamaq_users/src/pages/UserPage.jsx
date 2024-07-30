import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getUser } from '../services/UserService';
import Loading from '../components/Loading/Loading';
import ErrorPage from './Status/ErrorPage';
import '../styles/UserPage.css';

const UserPage = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUser(userId);
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorPage customError={error} />;
    }

    return (
        <div>
            <div className="breadcrumbs">
                <Link to="/">Home</Link> &gt; <Link to="/users">Users</Link> &gt; {user ? user.name : 'User Details'}
            </div>
            <div className="user-details-title">
                <h1>{user ? `${user.name} User Details` : 'User Details'}</h1>
                <div className="user-details-buttons">
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
            <div className="user-details-container">
                <p>Gender: {user.gender}</p>
                <p>Email: {user.email}</p>
                <div className="view-posts-comments">
                    <Link to={`/user/${userId}/posts-comments`}>View Posts and Comments From User</Link>
                </div>
            </div>
        </div>
    );
};

export default UserPage;