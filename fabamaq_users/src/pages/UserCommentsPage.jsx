import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getComments } from '../services/CommentsService';

const UserCommentsPage = () => {
    const { userId } = useParams();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const commentsData = await getComments(userId);
                setComments(commentsData);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
        fetchComments();
    }, [userId]);

    return (
        <div>
            <h1>User Comments</h1>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id}>{comment.body}</li>
                ))}
            </ul>
            <Link to={`/user/${userId}/comments/statistics`}>View Comments Statistics</Link>
        </div>
    );
};

export default UserCommentsPage;