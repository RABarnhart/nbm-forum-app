import { USER_STORE_KEY } from "@/services/token";
import { UserType } from "@/types/api";
import { createMMKV, deleteMMKV } from "react-native-mmkv";

type UserStoreResponse = UserType | null;

export const useUserStore = () => {
  const storage = createMMKV();

  const user = storage.getString(USER_STORE_KEY);
  let userData: UserStoreResponse = null;

  if (user) {
    try {
      userData = JSON.parse(user) as UserType;
    } catch (error) {
      console.error("JSON Parse error in useUserStore:", error);
      deleteMMKV(USER_STORE_KEY);
    }
  }

  function saveUser(data: UserType) {
    try {
      storage.set(USER_STORE_KEY, JSON.stringify(data));
    } catch (error) {
      console.log("save user error: ", JSON.stringify(error, null, 4));
    }
  }

  function deleteUser() {
    deleteMMKV(USER_STORE_KEY);
  }
  return { user: userData, saveUser: saveUser, deleteUser };
};

export default useUserStore;
