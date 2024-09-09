import { createContext, useContext, useEffect, useState } from "react";
import { useLoginCheck } from "./loginCheck";
import api from "../api";
import { useApi } from "../hook/useApi";
import { ApiSuccessResponse } from "../types/common";
import { UserInterface } from "../types/user";

interface ContextInterface {
  userEmail: string;
  userName: string;
}

const UserInfoContext = createContext<ContextInterface>({
  userEmail: "",
  userName: "",
});

export const UserInfoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
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
        setUserName(res.data.userName);
        setUserEmail(res.data.userEmail);
      },
    });
  }, [isLoggedIn]);

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
