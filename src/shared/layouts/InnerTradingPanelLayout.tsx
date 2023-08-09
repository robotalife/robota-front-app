import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import HeadBand from "../../components/pageStructure/HeadBand";
import PageTitle from "../../components/pageStructure/PageTitle";
import LinkBar from "../../components/pageStructure/LinkBar";
import { useCallback, useContext, useState } from "react";
import { botTabs } from "../consts/linksAndTabs";
import Button from "../../components/formElements/Button";
import {
  IconInfoCircle,
  IconPause,
  IconPencil,
  IconPlay,
  IconVrHeadset,
} from "../icons/Icons";
import { Container, Grid, Typography } from "@mui/material";
import { BotContext } from "../providers/BotProvider";
import { AxiosResponse } from "axios";
import useAxios from "../hooks/useAxios";
import apiEndPoints from "../consts/apiEndpoints";
import LayoutBreadcrumbs from "../../components/pageStructure/LayoutBreadcrumbs";
import routes from "../consts/routes";

const InnerTradingPanelLayout = () => {
  const { axios } = useAxios();
  const { botData, getBotData } = useContext(BotContext);
  const { botId = "" } = useParams();
  const { pathname } = useLocation();
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

  return (
    <Container maxWidth="xl" sx={{ margin: 0 }}>
      <LayoutBreadcrumbs>
        <Link to={routes.botsNew}>
          <IconVrHeadset />
        </Link>
        <Link to={routes.myBots}>My Bots</Link>
        <Typography component={"span"}>{pageTitle}</Typography>
      </LayoutBreadcrumbs>
      <PageTitle title={pageTitle}>
        <Grid container spacing={2} alignItems={"center"}>
          <Grid item xs={12} sx={{ display: { lg: "none" } }}>
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
          <Grid item xs={12} lg={"auto"}>
            {botData.stopped ? (
              <Grid container columns={2} spacing={2}>
                <Grid item xs={6} lg>
                  <Button
                    variant="outlined"
                    size="medium"
                    sx={{ mb: { xs: 1, lg: 0 } }}
                    fullWidth
                    disabled={loading}
                  >
                    <IconPencil style={{ width: 20, marginRight: 10 }} />
                    Delete
                  </Button>
                </Grid>
                <Grid item xs={6} lg>
                  <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    sx={{ mb: { xs: 1, lg: 0 } }}
                    fullWidth
                    disabled={loading}
                    onClick={startBot}
                  >
                    <IconPlay style={{ width: 20, marginRight: 10 }} />
                    Start Bot
                  </Button>
                </Grid>
              </Grid>
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
                <IconPause style={{ width: 20, marginRight: 10 }} />
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

export default InnerTradingPanelLayout;
