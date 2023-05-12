import { Outlet, useLocation, useParams } from "react-router-dom";
import PageTitle from "../../components/pageStructure/PageTitle";
import LinkBar from "../../components/pageStructure/LinkBar";
import routes from "../consts/routes";
import { useContext, useEffect, useState } from "react";
import { MyBotsContext } from "../providers/MyBotsProvider";

const ExchangeLayout = () => {
  const { pathname } = useLocation();
  const { paginateData } = useContext(MyBotsContext);
  const [pageTitle, setPageTitle] = useState("");

  const links = [
    {
      label: "Exchnages",
      to: routes.exchangeList,
    },
    {
      label: "Security",
      to: routes.exchangeSecurity,
    },
    {
      label: "Notifications",
      to: routes.exchangeNotifications,
    },
    {
      label: "Edit Profile",
      to: routes.exchangeEditProfile,
    },
    {
      label: "Invoices",
      to: routes.exchangeInvoices,
    },
  ];

  useEffect(() => {
    const title = links.find((link) => pathname === link.to)?.label;
    setPageTitle(title || "");
  }, [pathname]);

  return (
    <div>
      <PageTitle title={pageTitle} />
      <LinkBar links={links} />
      <Outlet />
    </div>
  );
};

export default ExchangeLayout;
