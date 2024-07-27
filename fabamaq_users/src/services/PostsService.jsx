import axios from "axios";
import {API_KEY} from "./urls.js";

export const getPosts = async (userId) => {
    try {
        const response = await axios.get(`https://gorest.co.in/public/v2/users/${userId}/posts`, {
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