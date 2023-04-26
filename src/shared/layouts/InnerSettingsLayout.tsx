import { Outlet, useLocation, useParams } from "react-router-dom";
import HeadBand from "../../components/pageStructure/HeadBand";
import PageTitle from "../../components/pageStructure/PageTitle";
import LinkBar from "../../components/pageStructure/LinkBar";
import { useEffect, useState } from "react";
import { BotProvider } from "../providers/BotProvider";
import { botTabs } from "../consts/linksAndTabs";
import Button from "../../components/formElements/Button";

const InnerSettingsLayout = () => {
  const { botId = "" } = useParams();
  const { pathname } = useLocation();
  const [pageTitle, setPageTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const title = botTabs(botId).find((link) => pathname === link.to)?.label;
    setPageTitle(title || "");
  }, [pathname]);

  return (
    <BotProvider>
      <PageTitle title={pageTitle}>
        <Button variant="contained" color="primary" size="small">
          Stop Bot
        </Button>
      </PageTitle>
      <HeadBand isOpen={isOpen} />
      <LinkBar links={botTabs(botId)} />
      <Outlet />
    </BotProvider>
  );
};

export default InnerSettingsLayout;
