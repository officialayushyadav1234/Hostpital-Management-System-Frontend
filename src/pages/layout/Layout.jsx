import { Toaster } from "react-hot-toast";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import style from "./layout.module.css";

const Layout = () => {
  return (
    <div className={style.layoutContainer}>
      <header className={style.header}>
        <Header />
      </header>

      <main className={style.mainContent}>
        <Outlet />
      </main>

      <footer className={style.footer}>
        <Footer />
      </footer>

      <Toaster />
    </div>
  );
};

export default Layout;
