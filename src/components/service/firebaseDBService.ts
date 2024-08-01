import {
  collection,
  CollectionReference,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  DocumentReference,
  deleteDoc,
} from "firebase/firestore";
import { useFirebaseApp } from "../context/firebaseApp";
import { CreateTaskInterface, TaskInterface } from "../types/task";
import { ApiResponse, CustomApiResponse } from "../types/common";

const useFirebaseDBActions = () => {
  const { firestoreDB } = useFirebaseApp();
  const firebaseTableName = "todos";

  const getFirebaseCollectionRef = (): CollectionReference | null => {
    if (!firestoreDB) {
      return null;
    }
    return collection(firestoreDB, firebaseTableName);
  };

  const getFirebaseDocRef = (taskId: string): DocumentReference | null => {
    if (!firestoreDB) {
      return null;
    }
    return doc(firestoreDB, firebaseTableName, taskId);
  };

  const getTasks = async (
    searchText?: string
  ): Promise<CustomApiResponse<TaskInterface[]>> => {
    try {
      const dbRef = getFirebaseCollectionRef();
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

  const getTaskById = async (
    taskId: string
  ): Promise<CustomApiResponse<TaskInterface>> => {
    try {
      const dbRef = getFirebaseCollectionRef();
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
      const todo = todosResponse.find((doc) => doc.id === taskId);
      if (!todo) {
        return {
          isSuccess: false,
          error: {
            message: "Task not found",
          },
        };
      }
      return {
        isSuccess: true,
        data: todo,
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

  const addTask = async (
    newTask: CreateTaskInterface
  ): Promise<ApiResponse> => {
    try {
      const dbRef = getFirebaseCollectionRef();
      if (!dbRef) {
        return {
          isSuccess: false,
          message: "Firestore Database is not available",
        };
      }
      await addDoc(dbRef, newTask);
      return {
        isSuccess: true,
        message: "Task added successfully",
      };
    } catch (error: any) {
      return {
        isSuccess: false,
        message: error?.message ?? "Something went wrong",
      };
    }
  };

  const editTask = async (
    taskId: string,
    updatedTask: CreateTaskInterface
  ): Promise<ApiResponse> => {
    try {
      const docRef = getFirebaseDocRef(taskId);
      if (!docRef) {
        return {
          isSuccess: false,
          message: "Firestore Database is not available",
        };
      }
      await updateDoc(docRef, { ...updatedTask });
      return {
        isSuccess: true,
        message: "Task edited successfully",
      };
    } catch (error: any) {
      return {
        isSuccess: false,
        message: error?.message ?? "Something went wrong",
      };
    }
  };

  const updateTaskStatus = async (
    taskId: string,
    updatedTask: TaskInterface
  ): Promise<ApiResponse> => {
    try {
      const docRef = getFirebaseDocRef(taskId);
      if (!docRef) {
        return {
          isSuccess: false,
          message: "Firestore Database is not available",
        };
      }
      await updateDoc(docRef, { ...updatedTask });
      return {
        isSuccess: true,
        message: updatedTask.isCompleted
          ? "Task marked completed"
          : "Task unmarked completed",
      };
    } catch (error: any) {
      return {
        isSuccess: false,
        message: error?.message ?? "Something went wrong",
      };
    }
  };

  const deleteTask = async (taskId: string): Promise<ApiResponse> => {
    try {
      const docRef = getFirebaseDocRef(taskId);
      if (!docRef) {
        return {
          isSuccess: false,
          message: "Firestore Database is not available",
        };
      }
      await deleteDoc(docRef);
      return {
        isSuccess: true,
        message: "Task deleted successfully",
      };
    } catch (error: any) {
      return {
        isSuccess: false,
        message: error?.message ?? "Something went wrong",
      };
    }
  };

  return {
    getFirebaseCollectionRef,
    getTasks,
    addTask,
    editTask,
    getTaskById,
    deleteTask,
    updateTaskStatus,
  };
};

export default useFirebaseDBActions;
