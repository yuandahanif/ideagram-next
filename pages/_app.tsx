import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextComponentType, NextPageContext } from "next";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import React, { ReactElement } from "react";
import { CustomNextPage } from "../types/CustomNextPage";

type Props = AppProps & {
  Component: CustomNextPage;
};

function MyApp({ Component, pageProps: { session, ...pageProps } }: Props) {
  const queryClient = new QueryClient();
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
}

function Auth({ children }: { children: ReactElement<any, any> }) {
  const { data: session, status } = useSession();
  const isUser = !!session?.user;
  React.useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!isUser) signIn(); // If not authenticated, force log in
  }, [isUser, status]);

  if (isUser) {
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>;
}

export default MyApp;
