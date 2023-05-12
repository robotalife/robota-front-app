import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import HeadBand from "../../components/pageStructure/HeadBand";
import PageTitle from "../../components/pageStructure/PageTitle";
import LinkBar from "../../components/pageStructure/LinkBar";
import { useCallback, useContext, useEffect, useState } from "react";
import { botTabs } from "../consts/linksAndTabs";
import Button from "../../components/formElements/Button";
import {
  IconInfoCircle,
  IconPause,
  IconPlay,
  IconSliders,
} from "../icons/Icons";
import { Container, Grid, IconButton, Typography } from "@mui/material";
import { BotContext } from "../providers/BotProvider";
import { AxiosResponse } from "axios";
import useAxios from "../hooks/useAxios";
import apiEndPoints from "../consts/apiEndpoints";
import LayoutBreadcrumbs from "../../components/pageStructure/LayoutBreadcrumbs";
import routes from "../consts/routes";

const InnerSettingsLayout = () => {
  const { axios } = useAxios();
  const { botData, getBotData } = useContext(BotContext);
  const { botId = "" } = useParams();
  const { pathname } = useLocation();
  // const [pageTitle, setPageTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const pageTitle =
    botTabs(botId).find((link) => pathname === link.to)?.label || "";

  const stopBot = useCallback(async () => {
    setLoading(true);

    try {
      const response: AxiosResponse<any, any> = await axios.post(
        apiEndPoints.getStopBot(botId as string)
      );
      getBotData();
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  const startBot = useCallback(async () => {
    setLoading(true);

    try {
      const response: AxiosResponse<any, any> = await axios.post(
        apiEndPoints.getRestartBot(botId as string)
      );
      getBotData();
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  // useEffect(() => {
  //   const title = botTabs(botId).find((link) => pathname === link.to)?.label;
  //   setPageTitle(title || "");
  // }, [pathname]);

  console.log();

  return (
    <Container maxWidth="xl" sx={{ margin: 0 }}>
      <LayoutBreadcrumbs>
        <Link to={routes.botsNew}>
          <IconSliders />
        </Link>
        <Link to={routes.botsNew}>Settings</Link>
        <Link to={routes.myBots}>Bots</Link>
        <Typography component={"span"}>{pageTitle}</Typography>
      </LayoutBreadcrumbs>
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
                disabled={loading}
                onClick={startBot}
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
                disabled={loading}
                onClick={stopBot}
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
    </Container>
  );
};

export default InnerSettingsLayout;
