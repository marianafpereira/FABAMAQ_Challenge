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
                setPostsCount(postsData.user.posts.totalCount);

                let totalCommentsCount = 0;
                for (const post of postsData.user.posts.nodes) {
                    const commentsData = await getCommentsStatistics(post.id);
                    totalCommentsCount += commentsData.post.comments.totalCount;
                }
                setCommentsCount(totalCommentsCount);
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