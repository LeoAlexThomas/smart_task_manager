import { createContext, useContext } from "react";
import { useFirebaseApp } from "./firebaseApp";

interface ContextInterface {
  userEmail: string | null;
  userName: string | null;
}

const UserInfoContext = createContext<ContextInterface>({
  userEmail: null,
  userName: null,
});

export const UserInfoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { auth } = useFirebaseApp();
  const userName = auth?.currentUser?.displayName || null;
  const userEmail = auth?.currentUser?.email || null;

  return (
    <UserInfoContext.Provider
      value={{
        userEmail,
        userName,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

export const useUserInfo = () => useContext(UserInfoContext);
