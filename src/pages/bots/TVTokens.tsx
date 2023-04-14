import HeadBand from "../../components/pageStructure/HeadBand";
import PageTitle from "../../components/pageStructure/PageTitle";

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

const TVTokens = () => {
  return (
    <>
      <PageTitle title="Trading View Tokens" />
      <HeadBand items={data} />
    </>
  );
};

export default TVTokens;
