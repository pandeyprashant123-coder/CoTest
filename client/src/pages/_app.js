import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Footer from "@/components/Footer";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
    </SessionProvider>
  );
}
