import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPosts } from '../services/PostsService';
import { getComments } from '../services/CommentsService';
import { getUser } from '../services/UserService';
import Loading from '../components/Loading/Loading';

const UserPostsCommentsPage = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUser(userId);
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchPostsAndComments = async () => {
            try {
                const postsData = await getPosts(userId);
                setPosts(postsData);

                const commentsData = await Promise.all(postsData.map(post => getComments(post.id)));
                setComments(commentsData.flat());
            } catch (error) {
                console.error('Error fetching posts and comments:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
        fetchPostsAndComments();
    }, [userId]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <h1>{user ? `${user.name}'s Posts and Comments` : 'User Posts and Comments'}</h1>
            <div>
                <h2>Posts</h2>
                {posts.length > 0 ? (
                    <ul>
                        {posts.map(post => (
                            <li key={post.id}>
                                <h3>{post.title}</h3>
                                <p>{post.body}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>There's no data for this field.</p>
                )}
            </div>
            <div>
                <h2>Comments</h2>
                {comments.length > 0 ? (
                    <ul>
                        {comments.map(comment => (
                            <li key={comment.id}>
                                <p>{comment.body}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>There's no data for this field.</p>
                )}
                <Link to={`/user/${userId}/statistics`}>View Posts and Comments Statistics</Link>
            </div>
        </div>
    );
};

export default UserPostsCommentsPage;