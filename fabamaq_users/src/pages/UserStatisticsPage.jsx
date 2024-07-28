import React from 'react';
import { useParams } from 'react-router-dom';
import UserStatistics from '../components/UserStatistics/UserStatistics';

const UserStatisticsPage = () => {
    const { userId } = useParams();

    return (
        <div>
            <h1>Statistics for User {userId}</h1>
            <UserStatistics userId={userId} />
        </div>
    );
};

export default UserStatisticsPage;