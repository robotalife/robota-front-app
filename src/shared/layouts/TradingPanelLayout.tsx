import { Outlet, useLocation, useParams } from "react-router-dom";
import PageTitle from "../../components/pageStructure/PageTitle";
import LinkBar from "../../components/pageStructure/LinkBar";
import routes from "../consts/routes";
import { useContext, useEffect, useState } from "react";
import { MyBotsContext } from "../providers/MyBotsProvider";
import { botsPages } from "../consts/linksAndTabs";

const TradingPanelLayout = () => {
  const { pathname } = useLocation();
  const { paginateData } = useContext(MyBotsContext);
  const [pageTitle, setPageTitle] = useState("");

  const links = [
    {
      label: "Add new bot",
      to: routes.botsNew,
    },
    {
      label: "My bots",
      to: routes.myBots,
      badge: paginateData.total,
    },
  ];

  useEffect(() => {
    const title = links.find((link) => pathname === link.to)?.label;
    setPageTitle(title || "");
  }, [pathname]);

  return (
    <div>
      <PageTitle title={pageTitle} />
      <LinkBar links={botsPages(paginateData.total)} />
      <Outlet />
    </div>
  );
};

export default TradingPanelLayout;