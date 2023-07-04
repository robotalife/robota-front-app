import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import PageTitle from "../../components/pageStructure/PageTitle";
import LinkBar from "../../components/pageStructure/LinkBar";
import routes from "../consts/routes";
import { useCallback, useContext, useEffect, useState } from "react";
import { MyBotsContext } from "../providers/MyBotsProvider";
import { storeTabs } from "../consts/linksAndTabs";
import { BotContext } from "../providers/BotProvider";
import useAxios from "../hooks/useAxios";
import apiEndPoints from "../consts/apiEndpoints";
import { AxiosResponse } from "axios";
import { Container, Grid, Typography } from "@mui/material";
import LayoutBreadcrumbs from "../../components/pageStructure/LayoutBreadcrumbs";
import {
  IconCopy,
  IconInfoCircle,
  IconPause,
  IconPlay,
  IconVrHeadset,
} from "../icons/Icons";
import Button from "../../components/formElements/Button";
import HeadBand from "../../components/pageStructure/HeadBand";

const InnerStoreLayout = () => {
  const { axios } = useAxios();
  const { botData, getBotData } = useContext(BotContext);
  const { botId = "" } = useParams();
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const pageTitle =
    storeTabs(botId).find((link) => pathname === link.to)?.label || "";

  return (
    <Container maxWidth="xl" sx={{ margin: 0 }}>
      <LayoutBreadcrumbs>
        <Link to={routes.botsNew}>
          <IconVrHeadset />
        </Link>
        <Link to={routes.myBots}>Bot Store</Link>
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
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ mb: { xs: 2, lg: 0 } }}
              fullWidth
              disabled={loading}
              onClick={() => {}}
            >
              <IconCopy style={{ marginRight: 10 }} />
              Copy Bot
            </Button>
          </Grid>
        </Grid>
      </PageTitle>
      <HeadBand isOpen={isOpen} />
      <LinkBar links={storeTabs(botId)} />
      <Outlet />
    </Container>
  );
};

export default InnerStoreLayout;
