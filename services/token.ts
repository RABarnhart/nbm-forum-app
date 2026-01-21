import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "userAuthToken";
const ID_KEY = "userId";
export const USER_STORE_KEY = "userStoreKey";

export async function saveToken(token: string) {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    console.log("Token successfully saved.");
  } catch (error) {
    console.error("Error saving token:", error);
  }
}

export async function getToken(): Promise<string | null> {
  try {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    return token;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
}

export async function deleteToken() {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    console.log("Token successfully deleted.");
  } catch (error) {
    console.error("Error deleting token:", error);
  }
}

export async function saveUserId(id: string) {
  try {
    await SecureStore.setItemAsync(ID_KEY, id);
    console.log("User ID successfully saved.");
  } catch (error) {
    console.error("Error saving user ID:", error);
  }
}

export async function deleteUserId() {
  try {
    await SecureStore.deleteItemAsync(ID_KEY);
    console.log("User ID successfully deleted.");
  } catch (error) {
    console.error("Error delete user ID:", error);
  }
}

export async function getUserId(): Promise<string | null> {
  try {
    const userId = await SecureStore.getItemAsync(ID_KEY);
    return userId;
  } catch (error) {
    console.error("Error retrieving user ID:", error);
    return null;
  }
}
