import { createContext, useContext, useEffect, useState } from "react";
import { useLoginCheck } from "@/context/loginCheck";
import api from "@/components/api";
import { useApi } from "@/hook/useApi";
import { ApiSuccessResponse } from "@/types/common";
import { UserInterface } from "@/types/user";

interface ContextInterface {
  userId: string;
  userEmail: string;
  userName: string;
}

const UserInfoContext = createContext<ContextInterface>({
  userId: "",
  userEmail: "",
  userName: "",
});

export const UserInfoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentUser, setCurrentUser] = useState<UserInterface | null>(null);
  const { isLoggedIn } = useLoginCheck();
  const { makeApiCall } = useApi();

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    makeApiCall<ApiSuccessResponse<UserInterface>>({
      apiFn: () =>
        api("/user/current", {
          method: "GET",
        }),
      hideMessage: true,
      onSuccess: (res) => {
        setCurrentUser(res.data);
      },
    });
  }, [isLoggedIn]);

  return (
    <UserInfoContext.Provider
      value={{
        userId: currentUser?._id ?? "",
        userEmail: currentUser?.email ?? "",
        userName: currentUser?.name ?? "",
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

export const useUserInfo = () => useContext(UserInfoContext);
