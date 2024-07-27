import axios from "axios";
import {API_KEY} from "./urls.js";

export const getComments = async (postId) => {
    try {
        const response = await axios.get(`https://gorest.co.in/public/v2/posts/${postId}/comments`, {
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

