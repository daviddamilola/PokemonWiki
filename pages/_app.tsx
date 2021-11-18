import React from "react";
import { AppProps } from "next/app";
import { SearchProvider } from "../context/searchContext";
import "../styles/index.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SearchProvider>
      <Component {...pageProps} />
    </SearchProvider>
  );
}

export default MyApp;
