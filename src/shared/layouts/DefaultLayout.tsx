import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../components/pageStructure/Header";
import Sidebar from "../../components/pageStructure/Sidebar";
import classes from "./DefaultLayout.module.scss";
import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import routes from "../consts/routes";
import { ExchangeContext } from "../providers/ExchangeProvider";

export const DefaultLayout = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const { exchangeList } = useContext(ExchangeContext);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(routes.signin);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (exchangeList.length === 0) {
      navigate(routes.exchangeNew);
    }
  }, [exchangeList]);

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
