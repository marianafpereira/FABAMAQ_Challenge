import axios from "axios";
import {API_BASE_URL, API_KEY} from "../data/urls.js";


export const getPosts = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${userId}/posts`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
};

const getAllComments = async (postId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/posts/${postId}/comments`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw error;
    }
};

const getAllUsers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

const updateComment = async (comment) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/posts/${comment.post_id}/comments/${comment.id}`, { body: comment.body }, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(`Comment updated: ${response.data.id}`);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error(`Endpoint not found for comment ${comment.id}. Please check the URL and try again.`);
        } else {
            console.error(`Error updating comment ${comment.id}:`, error);
        }
    }
};

const processComments = async (userId) => {
    try {
        const posts = await getAllPosts(userId);
        const users = await getAllUsers();

        for (const post of posts) {
            const comments = await getAllComments(post.id);
            comments.forEach(comment => {
                const user = users.find(user => user.email === comment.email);
                if (user) {
                    comment.user_id = user.id;
                    updateComment(comment);
                }
            });
        }
    } catch (error) {
        console.error("Error processing comments:", error);
    }
};