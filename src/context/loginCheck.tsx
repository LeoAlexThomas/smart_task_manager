import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { unAutherizedPath, userTokenCookieName } from "@/components/utils";
import Cookies from "js-cookie";

interface ContextInterface {
  isLoggedIn: boolean;
  isLoggedInChecked: boolean;
}

const LoginCheckContext = createContext<ContextInterface>({
  isLoggedIn: false,
  isLoggedInChecked: false,
});

export const LoginCheckProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoggedInChecked, setIsLoggedInChecked] = useState<boolean>(false);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const path = router.asPath;
    if (unAutherizedPath.some((authPath) => path.includes(authPath))) {
      setIsLoggedInChecked(true);
      return;
    }
    const userToken = Cookies.get(userTokenCookieName);
    setIsLoggedInChecked(true);
    if (!userToken) {
      router.replace("/signIn/");
      return;
    }
    setIsLoggedIn(true);
  }, [router.isReady, router.asPath]);

  return (
    <LoginCheckContext.Provider
      value={{
        isLoggedIn,
        isLoggedInChecked,
      }}
    >
      {children}
    </LoginCheckContext.Provider>
  );
};

export const useLoginCheck = () => useContext(LoginCheckContext);
