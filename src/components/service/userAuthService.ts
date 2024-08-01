import {  createUserWithEmailAndPassword, UserCredential  } from 'firebase/auth';
import { useFirebaseApp } from '../context/firebaseApp';
import { ApiResponse } from '../types/common';
import { setUserToken } from '../utils';


export const createUser = async (userEmail: string, password: string): Promise<ApiResponse> => {
    try {
        
        const { auth } = useFirebaseApp();
        if(!auth) {
            return{
                isSuccess: false,
                message: "Firebase Auth is not available"
            };
        }
        const userDetails: UserCredential =  await createUserWithEmailAndPassword(auth, userEmail, password);
        const token: string = await userDetails.user.getIdToken();
        setUserToken(token);
        return { isSuccess: true, message: "User SignedUp successfully"}
    } catch (error) {
        return { isSuccess: false, message: `Creating user: Something went wrong` };
    }



}