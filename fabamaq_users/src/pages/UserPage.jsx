import React, { useEffect, useState } from 'react';
import { getUser, updateUser, deleteUser } from '../services/UserService';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ErrorPage from './Status/ErrorPage';
import { getPosts } from "../services/PostsService.jsx";
import Loading from '../components/Loading/Loading';

const UserPage = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', gender: '' });
    const [postId, setPostId] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            const fetchUser = async () => {
                try {
                    const userData = await getUser(userId);
                    setUser(userData);
                    setFormData({ name: userData.name, email: userData.email, gender: userData.gender });
                    const posts = await getPosts(userId);
                    if (posts.length > 0) {
                        setPostId(posts[0].id);
                    }
                } catch (error) {
                    if (error.response && error.response.status === 404) {
                        setError('User not found');
                    } else {
                        setError('Error fetching user');
                    }
                } finally {
                    setLoading(false);
                }
            };

            fetchUser();
        } else {
            setError('User ID is undefined');
            setLoading(false);
        }
    }, [userId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await updateUser(userId, formData);
            setUser(updatedUser);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating user:', error);
            setError(error.message);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteUser(userId);
            navigate('/');
        } catch (error) {
            console.error('Error deleting user:', error);
            setError(error.message);
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorPage customError={error} />;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{user.name} details</h1>
            {isEditing ? (
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label>Name:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label>Gender:</label>
                        <input type="text" name="gender" value={formData.gender} onChange={handleInputChange} />
                    </div>
                    <button type="submit">Save</button>
                    <button type="button" onClick={handleEditToggle}>Cancel</button>
                </form>
            ) : (
                <>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Gender:</strong> {user.gender}</p>
                    <button onClick={handleEditToggle}>Edit</button>
                </>
            )}
            <button onClick={handleDelete}>Delete Account</button>
            <div>
                <Link to={`/user/${userId}/posts-comments`}>View Your Posts and Comments</Link>
            </div>
        </div>
    );
};

export default UserPage;