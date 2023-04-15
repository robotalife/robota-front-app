import { Outlet, useLocation, useParams } from "react-router-dom";
import HeadBand from "../../components/pageStructure/HeadBand";
import PageTitle from "../../components/pageStructure/PageTitle";
import LinkBar from "../../components/pageStructure/LinkBar";
import routes from "../consts/routes";
import { useEffect, useState } from "react";

const data = [
  {
    title: "Name",
    item: "DYDX-USDT",
  },
  {
    title: "Price",
    item: "DYDX-USDT",
  },
  {
    title: "Exchange",
    item: "DYDX-USDT",
  },
  {
    title: "Pair",
    item: "DYDX-USDT",
  },
  {
    title: "Strategy",
    item: "DYDX-USDT",
  },
  {
    title: "Created by",
    item: "DYDX-USDT",
  },
  {
    title: "Started at",
    item: "DYDX-USDT",
  },
];

const InnerSettingsLayout = () => {
  const { botId } = useParams();
  const { pathname } = useLocation();
  const [pageTitle, setPageTitle] = useState("");

  const links = [
    {
      label: "Overview",
      to: `${routes.botOverview}/${botId}`,
      pageTitle: "",
    },
    {
      label: "Active Trades",
      to: `${routes.botActiveTrades}/${botId}`,
      pageTitle: "",
    },
    {
      label: "Trades History",
      to: `${routes.botTradesHistory}/${botId}`,
      pageTitle: "",
    },
    {
      label: "Events Log",
      to: `${routes.botLog}/${botId}`,
      pageTitle: "",
    },
    {
      label: "Trading View Tokens",
      to: `${routes.botTVToken}/${botId}`,
      pageTitle: "",
    },
  ];

  useEffect(() => {
    const title = links.find((link) => pathname === link.to)?.label;
    setPageTitle(title || "");
  }, [pathname]);

  return (
    <div>
      <PageTitle title={pageTitle} />
      <HeadBand items={data} />
      <LinkBar links={links} />
      <Outlet />
    </div>
  );
};

export default InnerSettingsLayout;
