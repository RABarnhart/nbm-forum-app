import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'userAuthToken';

export async function saveToken(token: string) {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    console.log('Token successfully saved.');
  } catch (error) {
    console.error('Error saving token:', error);
  }
}

export async function getToken(): Promise<string | null> {
  try {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    return token;
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
}

export async function deleteToken() {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    console.log('Token successfully deleted.');
  } catch (error) {
    console.error('Error deleting token:', error);
  }
}