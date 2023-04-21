import routes from "./routes";

export const botTabs = (botId: string | number) => {
  return [
    {
      label: "Overview",
      to: `${routes.botOverview}/${botId}`,
      pageTitle: "",
    },
    {
      label: "Active Trade",
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
};
