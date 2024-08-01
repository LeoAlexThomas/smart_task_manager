import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { createContext, useContext } from "react";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjw-HewoU7JXeoVxhp3vVvvXpbpDctjEA",
  authDomain: "smart-task-application.firebaseapp.com",
  projectId: "smart-task-application",
  storageBucket: "smart-task-application.appspot.com",
  messagingSenderId: "197016895270",
  appId: "1:197016895270:web:b7da880f4c412931c8cbe7",
};

interface ContextInterface {
  app: FirebaseApp | null;
  auth: Auth | null;
  firestoreDB: Firestore | null;
}

const FirebaseAppContext = createContext<ContextInterface>({
  app: null,
  auth: null,
  firestoreDB: null,
});

export const FirebaseAppProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Initialize Firebas
  const app = initializeApp(firebaseConfig);

  // Initialize Firebase Authentication and get a reference to the service
  const auth = getAuth(app);

  // Initialize Firebase Firestore and get a reference to the service
  const firestoreDB = getFirestore(app);

  return (
    <FirebaseAppContext.Provider
      value={{
        app,
        auth,
        firestoreDB,
      }}
    >
      {children}
    </FirebaseAppContext.Provider>
  );
};

export const useFirebaseApp = () => useContext(FirebaseAppContext);
