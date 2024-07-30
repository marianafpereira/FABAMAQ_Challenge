import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getUser, updateUser, deleteUser } from '../services/UserService';
import Loading from '../components/Loading/Loading';
import Footer from '../components/Footer/Footer';
import SectionHeading from '../components/Headings/SectionHeading';
import TitleHeading from "../components/Headings/TitleHeading.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
            toast.success('User details updated successfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                style: { backgroundColor: 'green' }
            });
        } catch (error) {
            console.error('Error updating user data:', error);
            toast.error('Error updating user: ' + error.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                style: { backgroundColor: 'red' }
            });
        }
    };

    const handleDeleteClick = async () => {
        try {
            await deleteUser(userId);
            toast.success('User deleted successfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                style: { backgroundColor: 'green' }
            });
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Error deleting user: ' + error.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                style: { backgroundColor: 'red' }
            });
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
                <Link to="/">Home</Link> &gt; {user ? user.name : 'User Details'}
            </div>
            <div className="user-details-title">
                <TitleHeading title={user ? user.name : 'User'} showUserIcon={true} />
                <div className="thick-underline"></div>
                <div className="subtitle">
                    <SectionHeading text="User's Details" />
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
                        <hr className="separator" />
                        <p><strong>Gender:</strong> <input type="text" name="gender" value={editedUser.gender} onChange={handleChange} /></p>
                        <hr className="separator" />
                        <p><strong>Email:</strong> <input type="email" name="email" value={editedUser.email} onChange={handleChange} /></p>
                    </>
                ) : (
                    <>
                        <p className="user-detail"><strong>Name:</strong> {user.name}</p>
                        <hr className="separator" />
                        <p className="user-detail"><strong>Gender:</strong> {user.gender}</p>
                        <hr className="separator" />
                        <p className="user-detail"><strong>Email:</strong> {user.email}</p>
                    </>
                )}
                <div className="view-posts-comments">
                    <Link to={`/user/${userId}/posts-comments`}>View Posts and Comments From User</Link>
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </div>
    );
};

export default UserPage;