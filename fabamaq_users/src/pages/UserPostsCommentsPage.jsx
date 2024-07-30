import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPosts } from '../services/PostsService';
import { getComments } from '../services/CommentsService';
import { getUser } from '../services/UserService';
import Loading from '../components/Loading/Loading';
import ErrorPage from './Status/ErrorPage';
import Footer from '../components/Footer/Footer';
import SectionHeading from '../components/Headings/SectionHeading';
import '../styles/UserPostsCommentsPage.css';
import TitleHeading from "../components/Headings/TitleHeading.jsx";

const UserPostsCommentsPage = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUser(userId);
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError(error.message);
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
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
        fetchPostsAndComments();
    }, [userId]);

    if (error) {
        return <ErrorPage customError={error} />;
    }

    return (
        <div>
            <div className="breadcrumbs">
                <Link to="/">Home</Link> &gt; <Link to={`/user/${userId}`}>User Details</Link> &gt; Posts and Comments
            </div>
            <div className="user-details-title">
                <TitleHeading title={user ? user.name : 'User'} showChatIcon={true} />
                <div className="thick-underline"></div>
                <SectionHeading text="Posts and Comments" className="subtitle sideline" />
            </div>
            <div className="user-details-container">
                <h2>Posts</h2>
                {loading ? (
                    <Loading />
                ) : posts.length > 0 ? (
                    <ul>
                        {posts.map(post => (
                            <li key={post.id}>
                                <p>{post.title}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>There's no data for this field.</p>
                )}
            </div>
            <div className="user-details-container">
                <h2>Comments</h2>
                {loading ? (
                    <Loading />
                ) : comments.length > 0 ? (
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
            </div>
            <div className="user-details-container">
                <h2>Statistics</h2>
                {loading ? (
                    <Loading />
                ) : (
                    <>
                        <p>Number of Posts: {posts.length}</p>
                        <p>Number of Comments: {comments.length}</p>
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default UserPostsCommentsPage;