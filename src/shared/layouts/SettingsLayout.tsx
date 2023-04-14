import { Outlet } from "react-router-dom";
import HeadBand from "../../components/pageStructure/HeadBand";
import PageTitle from "../../components/pageStructure/PageTitle";
import LinkBar from "../../components/pageStructure/LinkBar";

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

const links = [
  {
    label: "Overview",
    to: "/",
  },
  {
    label: "Active Trades",
    to: "/",
  },
  {
    label: "Trades History",
    to: "/",
  },
  {
    label: "Events Log",
    to: "/",
  },
  {
    label: "Trading View Tokens",
    to: "/",
  },
];

const SettingsLayout = () => {
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
