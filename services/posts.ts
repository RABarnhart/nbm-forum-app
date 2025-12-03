import axios from 'axios';
import { PostSearchPayload, PaginatedPostsResponse, PaginatedCommentsResponse } from '@/types/api';
import { getToken } from './token';

const API_ENDPOINT_POST_SEARCH = 'https://api.development.forum.mike-automations.link/posts/_search';
const API_ENDPOINT_COMMENTS_BASE = 'https://api.development.forum.mike-automations.link/posts';

export const getPosts = async ({ 
    pageParam = 1, 
    limit = 50, 
    filters 
}: { 
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
        page: pageParam, 
        limit: limit,
        ...filters
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

export const getComments = async ({ 
    postID, 
    pageParam = 1, 
    limit = 50 
}: { 
    postID: number;
    pageParam?: number; 
    limit?: number; 
}): Promise<PaginatedCommentsResponse> => {
    
    const token = await getToken();

    if (!token) {
        console.error('Access token not found. Cannot fetch comments.');
        throw new Error('Authentication required.'); 
    }

    const API_ENDPOINT_COMMENTS = `${API_ENDPOINT_COMMENTS_BASE}/${postID}/comments`;

    const payload = {
        page: pageParam, 
        limit: limit,
    };

    const config = {
headers: {
            'Authorization': `Bearer ${token}`, 
        },
        params: {
            page: pageParam, 
            limit: limit,
        },
    };

    try {
        const response = await axios.get(API_ENDPOINT_COMMENTS, config);
        return response.data;
    } catch (error) {
        console.error(`Error fetching comments for post ${postID}:`, error);
        throw error;
    }
};