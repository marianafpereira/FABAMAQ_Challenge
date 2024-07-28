import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserStatistics from '../components/UserStatistics/UserStatistics';
import { getUser } from '../services/UserService';
import Loading from '../components/Loading/Loading';

const UserStatisticsPage = () => {
    const { userId } = useParams();
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const userData = await getUser(userId);
                setUserName(userData.name);
            } catch (error) {
                console.error('Error fetching user name:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserName();
    }, [userId]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <h1>Statistics for User {userName}</h1>
            <UserStatistics userId={userId} />
        </div>
    );
};

export default UserStatisticsPage;