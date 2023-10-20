import { Sidebar } from "../components/Sidebar.jsx";
import styles from "./AppLayout.module.css";
import Map from "../components/Map.jsx";

export const AppLayout = () => {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
};
