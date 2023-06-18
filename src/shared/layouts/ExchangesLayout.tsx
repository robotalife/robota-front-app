import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import PageTitle from "../../components/pageStructure/PageTitle";
import LinkBar from "../../components/pageStructure/LinkBar";
import { useEffect, useState } from "react";
import { exchangeTabs } from "../consts/linksAndTabs";
import LayoutBreadcrumbs from "../../components/pageStructure/LayoutBreadcrumbs";
import routes from "../consts/routes";
import { IconOctagonCircle } from "../icons/Icons";
import { Typography } from "@mui/material";

const ExchangeLayout = () => {
  const { pathname } = useLocation();
  const [pageTitle, setPageTitle] = useState("");
  const { exchangeType } = useParams();

  useEffect(() => {
    const title =
      exchangeTabs.find((link) => pathname === link.to)?.label ||
      (exchangeType && "Update Exchange") ||
      "Add Exchange";

    setPageTitle(title || "");
  }, [pathname]);

  return (
    <>
      <LayoutBreadcrumbs>
        <Link to={routes.exchangeList}>
          <IconOctagonCircle />
        </Link>
        <Link to={routes.exchangeList}>Settings</Link>
        <Typography component={"span"}>{pageTitle}</Typography>
      </LayoutBreadcrumbs>

      <PageTitle title={pageTitle} />
      <LinkBar links={exchangeTabs} />
      <Outlet />
    </>
  );
};

export default ExchangeLayout;
