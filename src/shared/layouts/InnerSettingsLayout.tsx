import { Outlet, useLocation, useParams } from "react-router-dom";
import HeadBand from "../../components/pageStructure/HeadBand";
import PageTitle from "../../components/pageStructure/PageTitle";
import LinkBar from "../../components/pageStructure/LinkBar";
import routes from "../consts/routes";
import { useEffect, useState } from "react";

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
      <HeadBand />
      <LinkBar links={links} />
      <Outlet />
    </div>
  );
};

export default InnerSettingsLayout;
