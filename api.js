import axios from 'axios';

const API_URL = 'https://gorest.co.in/public/v2';
const TOKEN = 'ba283c9d6e45d802c624bc2ea2df9bba69049ee3fc58a4af87b23e8b6f724835';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: `Bearer ${TOKEN}`,
    },
});

export const getUsers = () => api.get('/users');
export const getUser = (id) => api.get(`/users/${id}`);
export const createUser = (data) => api.post('/users', data);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);
export const getUserPosts = (id) => api.get(`/users/${id}/posts`);
export const getPostComments = (postId) => api.get(`/posts/${postId}/comments`);
