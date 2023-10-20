import styles from "./Sidebar.module.css";
import { AppNav } from "./AppNav.jsx";
import Logo from "./Logo.jsx";
import { Outlet } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      {/* Where the nested routes will show */}
      <Outlet />
      <p>List of cities</p>
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
        </p>
      </footer>
    </div>
  );
};
