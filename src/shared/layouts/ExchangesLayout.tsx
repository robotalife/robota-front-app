import { Outlet, useLocation } from "react-router-dom";
import PageTitle from "../../components/pageStructure/PageTitle";
import LinkBar from "../../components/pageStructure/LinkBar";
import { useEffect, useState } from "react";
import { exchangeTabs } from "../consts/linksAndTabs";

const ExchangeLayout = () => {
  const { pathname } = useLocation();
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    const title =
      exchangeTabs.find((link) => pathname === link.to)?.label ||
      "Add Exchange";

    setPageTitle(title || "");
  }, [pathname]);

  return (
    <>
      <PageTitle title={pageTitle} />
      <LinkBar links={exchangeTabs} />
      <Outlet />
    </>
  );
};

export default ExchangeLayout;
