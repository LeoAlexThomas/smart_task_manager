import { collection, CollectionReference, getDocs } from "firebase/firestore";
import { useFirebaseApp } from "../context/firebaseApp";
import { TaskInterface } from "../types/task";
import { CustomApiResponse } from "../types/common";

const useFirebaseDBActions = () => {
  const { firestoreDB } = useFirebaseApp();
  const firebaseTableName = "todos";

  const getFirebaseDocRef = (): CollectionReference | null => {
    if (!firestoreDB) {
      return null;
    }
    return collection(firestoreDB, firebaseTableName);
  };

  const getTodos = async (
    searchText?: string
  ): Promise<CustomApiResponse<TaskInterface[]>> => {
    try {
      const dbRef = getFirebaseDocRef();
      if (!dbRef) {
        return {
          isSuccess: false,
          error: {
            message: "Firestore Database is not available",
          },
        };
      }
      const response = await getDocs(dbRef);
      const todosResponse = response.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as unknown as TaskInterface[];

      return {
        isSuccess: true,
        data: todosResponse.filter(
          (task) => !searchText || task.title.includes(searchText)
        ),
      };
    } catch (error: any) {
      return {
        isSuccess: false,
        error: {
          message: error?.message ?? "Something went wrong",
        },
      };
    }
  };

  return {
    getTodos,
  };
};

export default useFirebaseDBActions;
