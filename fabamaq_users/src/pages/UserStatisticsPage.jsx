import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserStatistics from '../components/UserStatistics/UserStatistics';
import { getUser } from '../services/UserService';
import Loading from '../components/Loading/Loading';
import ErrorPage from './Status/ErrorPage';

const UserStatisticsPage = () => {
    const { userId } = useParams();
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const userData = await getUser(userId);
                setUserName(userData.name);
            } catch (error) {
                console.error('Error fetching user name:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserName();
    }, [userId]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorPage customError={error} />;
    }

    return (
        <div>
            <h1>Statistics for User {userName}</h1>
            <UserStatistics userId={userId} setError={setError} />
        </div>
    );
};

export default UserStatisticsPage;