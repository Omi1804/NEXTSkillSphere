import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Header from "@/components/Header";
import "@/styles/global.css";
import Footer from "./footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </RecoilRoot>
  );
}
