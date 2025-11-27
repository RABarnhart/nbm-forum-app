import axios from 'axios';
import { RegisterPayload } from '@/types/api';

const API_ENDPOINT = 'https://api.development.forum.mike-automations.link/auth/register';

export const registerUser = async (payload: RegisterPayload) => {
    const response = await axios.post(API_ENDPOINT, payload);
    return response.data;
};