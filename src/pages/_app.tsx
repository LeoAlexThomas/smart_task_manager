// import { FirebaseAppProvider } from "@/context/firebaseApp";
import api from "@/components/api";
import { LoginCheckProvider } from "@/context/loginCheck";
import { UserInfoProvider } from "@/context/userInfo";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { ReactElement, ReactNode } from "react";
import Head from "next/head";
import { PageLoaderProvider } from "@/context/pageLoaderContext";
import { NextPage } from "next";
import { useRouter } from "next/router";

export const swrConfigData = {
  fetcher: api,
  onErrorRetry: (
    error: any,
    key: any,
    option: any,
    revalidate: any,
    { retryCount }: any
  ) => {
    if (retryCount >= 10) return;
    const status = error.response?.status;

    if (status >= 400 && status < 500) return;

    setTimeout(() => revalidate({ retryCount: retryCount + 1 }), 5000);
  },
};

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        {/* NOTE: Below code is to prevent zooming in iPhone when input is focused */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* <FirebaseAppProvider> */}
      <SWRConfig value={swrConfigData}>
        <LoginCheckProvider>
          <UserInfoProvider>
            <ChakraProvider>
              <PageLoaderProvider>
                {getLayout(<Component {...pageProps} key={router.asPath} />)}
              </PageLoaderProvider>
            </ChakraProvider>
          </UserInfoProvider>
        </LoginCheckProvider>
      </SWRConfig>
      {/* </FirebaseAppProvider> */}
    </>
  );
}
