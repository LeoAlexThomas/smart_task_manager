import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { createContext, useContext } from "react";

interface ContextInterface {
  app: FirebaseApp | null;
  auth: Auth | null;
}

const FirebaseAppContext = createContext<ContextInterface>({
  app: null,
  auth: null,
});

export const FirebaseAppProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Initialize Firebas
  const app = initializeApp({
    apiKey: "AIzaSyAjw-HewoU7JXeoVxhp3vVvvXpbpDctjEA",
  });

  // Initialize Firebase Authentication and get a reference to the service
  const auth = getAuth(app);

  return (
    <FirebaseAppContext.Provider
      value={{
        app,
        auth,
      }}
    >
      {children}
    </FirebaseAppContext.Provider>
  );
};

export const useFirebaseApp = () => useContext(FirebaseAppContext);
