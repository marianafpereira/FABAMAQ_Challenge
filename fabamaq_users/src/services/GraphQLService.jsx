import axios from 'axios';
import { API_KEY } from '../data/urls.js';

const GRAPHQL_ENDPOINT = 'https://gorest.co.in/public/v2/graphql';

const fetchGraphQL = async (query) => {
    try {
        const response = await axios.post(
            GRAPHQL_ENDPOINT,
            { query },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching GraphQL data:', error);
        throw error;
    }
};

export const getPostsStatistics = async (userId) => {
    const query = `
        query {
            user(id: ${userId}) {
                posts {
                    totalCount
                    nodes {
                        id
                        title
                        body
                    }
                }
            }
        }
    `;
    return fetchGraphQL(query);
};

export const getCommentsStatistics = async (userId) => {
    const query = `
        query {
            user(id: ${userId}) {
                comments {
                    totalCount
                    nodes {
                        id
                        body
                    }
                }
            }
        }
    `;
    return fetchGraphQL(query);
};