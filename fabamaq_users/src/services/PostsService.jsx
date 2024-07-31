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

