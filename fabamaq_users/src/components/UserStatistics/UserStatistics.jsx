import React, { useEffect, useState } from 'react';
import { getPostsStatistics, getCommentsStatistics } from '../../services/GraphQLService';
import Loading from '../Loading/Loading';

const UserStatistics = ({ userId }) => {
    const [postsCount, setPostsCount] = useState(0);
    const [commentsCount, setCommentsCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const postsData = await getPostsStatistics(userId);
                setPostsCount(postsData.data.user.posts.totalCount);

                const commentsData = await getCommentsStatistics(userId);
                setCommentsCount(commentsData.data.user.comments.totalCount);
            } catch (error) {
                console.error('Error fetching user statistics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStatistics();
    }, [userId]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <h2>User Statistics</h2>
            <p>Total Posts: {postsCount}</p>
            <p>Total Comments: {commentsCount}</p>
        </div>
    );
};

export default UserStatistics;