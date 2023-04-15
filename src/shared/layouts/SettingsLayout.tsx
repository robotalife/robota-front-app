import { Outlet, useParams } from "react-router-dom";
import HeadBand from "../../components/pageStructure/HeadBand";
import PageTitle from "../../components/pageStructure/PageTitle";
import LinkBar from "../../components/pageStructure/LinkBar";
import routes from "../consts/routes";

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

const SettingsLayout = () => {
  const { botId } = useParams();

  const links = [
    {
      label: "Overview",
      to: `${routes.botOverview}/${botId}`,
    },
    {
      label: "Active Trades",
      to: `${routes.botActiveTrades}/${botId}`,
    },
    {
      label: "Trades History",
      to: `${routes.botTradesHistory}/${botId}`,
    },
    {
      label: "Events Log",
      to: `${routes.botLog}/${botId}`,
    },
    {
      label: "Trading View Tokens",
      to: `${routes.botTVToken}/${botId}`,
    },
  ];

  return (
    <div>
      <PageTitle title="Trading View Tokens" />
      <HeadBand items={data} />
      <LinkBar links={links} />
      <Outlet />
    </div>
  );
};

export default SettingsLayout;
