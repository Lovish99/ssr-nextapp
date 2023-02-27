import Layout from "@/components/Layout";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { StoreProvider } from "@/client/context";

//every page pass through this component . so this  component have access to all page components
export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </StoreProvider>
  );
}
