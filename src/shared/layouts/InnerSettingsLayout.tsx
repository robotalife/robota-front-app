import { Outlet, useLocation, useParams } from "react-router-dom";
import HeadBand from "../../components/pageStructure/HeadBand";
import PageTitle from "../../components/pageStructure/PageTitle";
import LinkBar from "../../components/pageStructure/LinkBar";
import { useContext, useEffect, useState } from "react";
import { botTabs } from "../consts/linksAndTabs";
import Button from "../../components/formElements/Button";
import { IconInfoCircle, IconPause, IconPlay } from "../icons/Icons";
import { Grid } from "@mui/material";
import { BotContext } from "../providers/BotProvider";

const InnerSettingsLayout = () => {
  const { botData } = useContext(BotContext);
  const { botId = "" } = useParams();
  const { pathname } = useLocation();
  const [pageTitle, setPageTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const title = botTabs(botId).find((link) => pathname === link.to)?.label;
    setPageTitle(title || "");
  }, [pathname]);

  return (
    <>
      <PageTitle title={pageTitle}>
        <Grid container spacing={2} alignItems={"center"}>
          <Grid item xs={6} sx={{ display: { lg: "none" } }}>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              sx={{ mb: { xs: 2, lg: 0 } }}
              fullWidth
              onClick={() => setIsOpen(!isOpen)}
            >
              <IconInfoCircle style={{ marginRight: 10 }} />
              Bot Information
            </Button>
          </Grid>
          <Grid item xs={6} lg={"auto"}>
            {botData.stopped ? (
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{ mb: { xs: 2, lg: 0 } }}
                fullWidth
              >
                <IconPlay style={{ width: 10, marginRight: 10 }} />
                Start Bot
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{ mb: { xs: 2, lg: 0 } }}
                fullWidth
              >
                <IconPause style={{ width: 10, marginRight: 10 }} />
                Stop Bot
              </Button>
            )}
          </Grid>
        </Grid>
      </PageTitle>
      <HeadBand isOpen={isOpen} />
      <LinkBar links={botTabs(botId)} />
      <Outlet />
    </>
  );
};

export default InnerSettingsLayout;
