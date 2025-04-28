import { Header } from "../components/app-bar";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer";

export const RootLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
