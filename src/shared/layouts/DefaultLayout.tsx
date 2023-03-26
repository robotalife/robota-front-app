import { Outlet } from "react-router-dom";
import Header from "../../components/pageStructure/Header";
import Sidebar from "../../components/pageStructure/Sidebar";
import classes from "./DefaultLayout.module.scss";

export const DefaultLayout = () => {
  return (
    <div className={classes.layout}>
      <header className={classes.header}>
        <Header />
      </header>
      <aside className={classes.sidebar}>
        <Sidebar />
      </aside>
      <main className={classes.content}>
        <Outlet />
      </main>
    </div>
  );
};
