import "@/styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>정신과 초진까지... “ 6개월이요? ”</title>
        <meta name="description" content="보도문 및 전국 정신건강지원시설을 검색할 수 있는 '마음 안내소' 서비스를 제공하는 사이트입니다." />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 16 16%22><text y=%2214%22 font-size=%2214%22>🗺️</text></svg>" />
      </Head>
      <TooltipProvider>
        <Component {...pageProps} />
      </TooltipProvider>
    </>
  );
}
