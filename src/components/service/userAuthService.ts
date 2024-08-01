import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import { ApiResponse } from "../types/common";
import { setUserToken, userTokenCookieName } from "../utils";
import Cookies from "js-cookie";

export const createUser = async (
  userEmail: string,
  password: string,
  auth: Auth
): Promise<ApiResponse> => {
  try {
    const userDetails: UserCredential = await createUserWithEmailAndPassword(
      auth,
      userEmail,
      password
    );
    const token: string = await userDetails.user.getIdToken();
    setUserToken(token);
    return { isSuccess: true, message: "User SignedUp successfully" };
  } catch (error: any) {
    return {
      isSuccess: false,
      message: error.message ?? "Something went wrong",
    };
  }
};

export const loginUser = async (
  userEmail: string,
  password: string,
  auth: Auth
): Promise<ApiResponse> => {
  try {
    const userDetails: UserCredential = await signInWithEmailAndPassword(
      auth,
      userEmail,
      password
    );
    const token: string = await userDetails.user.getIdToken();
    setUserToken(token);
    return { isSuccess: true, message: "User SignedUp successfully" };
  } catch (error: any) {
    return {
      isSuccess: false,
      message: error.message ?? "Something went wrong",
    };
  }
};

export const logout = async (auth: Auth): Promise<ApiResponse> => {
  try {
    await signOut(auth);
    Cookies.remove(userTokenCookieName);
    return {
      isSuccess: true,
      message: "User Logout successfully",
    };
  } catch (error: any) {
    return {
      isSuccess: false,
      message: `User Logout failed: ${error.message}`,
    };
  }
};
