import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getUser, updateUser, deleteUser } from '../services/UserService';
import Loading from '../components/Loading/Loading';
import ErrorPage from './Status/ErrorPage';
import Footer from '../components/Footer/Footer';
import '../styles/UserPage.css';

const UserPage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({ name: '', gender: '', email: '' });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUser(userId);
                setUser(userData);
                setEditedUser(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            await updateUser(userId, editedUser);
            setUser(editedUser);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating user data:', error);
            setError(error.message);
        }
    };

    const handleDeleteClick = async () => {
        try {
            await deleteUser(userId);
            navigate('/');
        } catch (error) {
            console.error('Error deleting user:', error);
            setError(error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prev) => ({ ...prev, [name]: value }));
    };

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
                <h1>{user ? user.name : 'User'}</h1>
                <div className="thick-underline"></div>
                <div className="subtitle">
                    <span>User's Details</span>
                    <div className="user-details-buttons">
                        {isEditing ? (
                            <button onClick={handleSaveClick}>Save</button>
                        ) : (
                            <>
                                <button onClick={handleEditClick}>Edit</button>
                                <button onClick={handleDeleteClick}>Delete</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="user-details-container">
                {isEditing ? (
                    <>
                        <p><strong>Name:</strong> <input type="text" name="name" value={editedUser.name} onChange={handleChange} /></p>
                        <p><strong>Gender:</strong> <input type="text" name="gender" value={editedUser.gender} onChange={handleChange} /></p>
                        <p><strong>Email:</strong> <input type="email" name="email" value={editedUser.email} onChange={handleChange} /></p>
                    </>
                ) : (
                    <>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Gender:</strong> {user.gender}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                    </>
                )}
                <div className="view-posts-comments">
                    <Link to={`/user/${userId}/posts-comments`}>View Posts and Comments From User</Link>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserPage;