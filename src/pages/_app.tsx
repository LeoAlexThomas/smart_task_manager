import { FirebaseAppProvider } from "@/components/context/firebaseApp";
import { LoginCheckProvider } from "@/components/context/loginCheck";
import { UserInfoProvider } from "@/components/context/userInfo";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FirebaseAppProvider>
      <LoginCheckProvider>
        <UserInfoProvider>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </UserInfoProvider>
      </LoginCheckProvider>
    </FirebaseAppProvider>
  );
}
