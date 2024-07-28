import React from 'react';
import { useParams } from 'react-router-dom';

const CommentsStatisticsPage = () => {
    const { userId } = useParams();

    // Fetch and display statistics related to user comments here

    return (
        <div>
            <h1>Comments Statistics for User {userId}</h1>
            {/* Display statistics here */}
        </div>
    );
};

export default CommentsStatisticsPage;