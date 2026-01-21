import axios from 'axios';
import { RegisterPayload, SignInPayload } from '@/types/api';

const API_ENDPOINT_REGISTER = 'https://api.development.forum.mike-automations.link/auth/register';
const API_ENDPOINT_LOGIN = 'https://api.development.forum.mike-automations.link/auth/login';

export const registerUser = async (payload: RegisterPayload) => {
    const response = await axios.post(API_ENDPOINT_REGISTER, payload);
    return response.data;
};

export const signIn = async (payload: SignInPayload) => {
    const response = await axios.post(API_ENDPOINT_LOGIN, payload);
    return response.data;
}