import Navbar from "@/components/Navbar";
import { RatingProvider } from "@/context/RatingProvider";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <RatingProvider>
        <Navbar />
        <Component {...pageProps} />;
      </RatingProvider>
    </SessionProvider>
  );
}
