import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPosts } from '../services/PostsService';
import { getComments } from '../services/CommentsService';
import { getUser } from '../services/UserService';
import Loading from '../components/Loading/Loading';
import ErrorPage from './Status/ErrorPage';
import Footer from '../components/Footer/Footer';
import SectionHeading from '../components/Headings/SectionHeading';
import TitleHeading from "../components/Headings/TitleHeading.jsx";
import { ChatCircleText, Note, CheckCircle, ChartLine, HandPalm } from "@phosphor-icons/react";
import '../styles/UserPostsCommentsPage.css';

const UserPostsCommentsPage = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [loadingComments, setLoadingComments] = useState(true);
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
                setLoadingPosts(false);

                const commentsData = await Promise.all(postsData.map(post => getComments(post.id)));
                setComments(commentsData.flat());
                setLoadingComments(false);
            } catch (error) {
                console.error('Error fetching posts and comments:', error);
                setError(error.message);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        };

        fetchUserData();
        fetchPostsAndComments();
    }, [userId]);

    if (error) {
        return <ErrorPage customError={error} />;
    }

    if (loading) {
        return <Loading />;
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
                <h2><CheckCircle weight="duotone" color="var(--primary-color)" size={24} /> Posts</h2>
                {loadingPosts ? (
                    <Loading />
                ) : posts.length > 0 ? (
                    <ul>
                        {posts.map(post => (
                            <li key={post.id} className="post-item">
                                <Note weight="duotone" color="var(--primary-color)" size={24} />
                                <p>{post.title}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-data-message"><HandPalm weight="duotone" color="var(--primary-color)" size={24} /> There's no data for this field.</p>
                )}
            </div>
            <div className="user-details-container">
                <h2><CheckCircle weight="duotone" color="var(--primary-color)" size={24} /> Comments</h2>
                {loadingComments ? (
                    <Loading />
                ) : comments.length > 0 ? (
                    <ul>
                        {comments.map(comment => (
                            <li key={comment.id} className="comment-item">
                                <ChatCircleText weight="duotone" color="var(--primary-color)" size={24} />
                                <p>{comment.body}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-data-message"><HandPalm weight="duotone" color="var(--primary-color)" size={24} /> There's no data for this field.</p>
                )}
            </div>
            <div className="user-details-container">
                <h2><CheckCircle weight="duotone" color="var(--primary-color)" size={24} /> Statistics</h2>
                {loading ? (
                    <Loading />
                ) : (
                    <>
                        <p className="statistics-item"><ChartLine weight="duotone" color="var(--primary-color)" size={24} /> <strong>Number of Posts:</strong> {posts.length}</p>
                        <p className="statistics-item"><ChartLine weight="duotone" color="var(--primary-color)" size={24} /> <strong>Number of Comments:</strong> {comments.length}</p>
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default UserPostsCommentsPage;