import axios from 'axios';
import { PostSearchPayload, PaginatedPostsResponse } from '@/types/api';
import { getToken } from './token'; 

const API_ENDPOINT_POST_SEARCH = 'https://api.development.forum.mike-automations.link/posts/_search';

export const getPosts = async ({ pageParam = 1, limit = 50, filters }: { 
    pageParam?: number; 
    limit?: number; 
    filters?: PostSearchPayload; 
}): Promise<PaginatedPostsResponse> => {
    const token = await getToken();

    if (!token) {
        console.error('Access token not found. Cannot perform authenticated search.');
        throw new Error('Authentication required.'); 
    }

    const payload = {
        page: pageParam, // Use the pageParam provided by useInfiniteQuery
        limit: limit,
        ...filters // Include any filters if necessary
    };

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json', 
        },
    };

    try {
        const response = await axios.post(API_ENDPOINT_POST_SEARCH, payload, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching posts with token:', error);
        throw error;
    }
};
