import axios from "axios";
import { API_BASE_URL, API_KEY } from "../data/urls.js";

export const fetchUsers = async () => {
    try {
        const response = await axios.get(`https://gorest.co.in/public/v2/users`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Accept': 'application/json'
            }
        });
        if (response.headers['content-type'].includes('application/json')) {
            return response.data;
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const getUserBySearchTerm = async (searchTerm) => {
    try {
        const response = await axios.get(`https://gorest.co.in/public/v2/users?search=${searchTerm}`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });
    } catch (error) {
        console.error('Error fetching user by search term:', error);
        throw error;
    }
};

export const getUser = async (userId) => {
    try {
        const response = await axios.get(`https://gorest.co.in/public/v2/users/${userId}`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
};

export const updateUser = async (userId, userData) => {
    try {
        const response = await axios.put(`https://gorest.co.in/public/v2/users/${userId}`, userData, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

export const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`https://gorest.co.in/public/v2/users/${userId}`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};