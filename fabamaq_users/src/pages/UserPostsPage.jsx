import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPosts } from '../services/PostsService';

const UserPostsPage = () => {
    const { userId } = useParams();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsData = await getPosts(userId);
                setPosts(postsData);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, [userId]);

    return (
        <div>
            <h1>User Posts</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
            <Link to={`/user/${userId}/posts/statistics`}>View Posts Statistics</Link>
        </div>
    );
};

export default UserPostsPage;