import { FirebaseAppProvider } from "@/components/context/firebaseApp";
import { LoginCheckProvider } from "@/components/context/loginCheck";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FirebaseAppProvider>
      <LoginCheckProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </LoginCheckProvider>
    </FirebaseAppProvider>
  );
}
