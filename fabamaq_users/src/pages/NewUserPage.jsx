import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSubmit } from '../services/NewUserService';
import Footer from '../components/Footer/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TitleHeading from '../components/Headings/TitleHeading';
import '../styles/NewUserPage.css';

const NewUserPage = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        gender: '',
        status: 'active'
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleSubmit(e, user, setUser, navigate);
            toast.success('User has been added', {
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
            }, 5000);
        } catch (error) {
            console.error('Error creating user:', error);
            toast.error('Error creating user: ' + error.message, {
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

    return (
        <div>
            <div className="breadcrumbs">
                <a href="/">Home</a> &gt; Create New User
            </div>
            <div className="user-details-title">
                <TitleHeading title="New User" showUserIcon={true} />
                <div className="thick-underline"></div>
            </div>
            <div className="user-details-container">
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Gender:</label>
                        <select
                            name="gender"
                            value={user.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <button type="submit">Create User</button>
                </form>
            </div>
            <Footer />
            <ToastContainer />
        </div>
    );
};

export default NewUserPage;