import {Link, Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import HeadBand from "../../components/pageStructure/HeadBand";
import PageTitle from "../../components/pageStructure/PageTitle";
import LinkBar from "../../components/pageStructure/LinkBar";
import {useCallback, useContext, useState} from "react";
import {botTabs} from "../consts/linksAndTabs";
import Button from "../../components/formElements/Button";
import {IconInfoCircle, IconModalDelete, IconPause, IconPencil, IconPlay, IconVrHeadset,} from "../icons/Icons";
import {Container, Grid, Tooltip, Typography} from "@mui/material";
import {BotContext} from "../providers/BotProvider";
import {AxiosResponse} from "axios";
import useAxios from "../hooks/useAxios";
import apiEndPoints from "../consts/apiEndpoints";
import LayoutBreadcrumbs from "../../components/pageStructure/LayoutBreadcrumbs";
import routes from "../consts/routes";
import classes from "../../components/shared/exchangeCard/ExchangeCard.module.scss";
import Modal from "../../components/shared/Modal";


const InnerTradingPanelLayout = () => {
    const navigate = useNavigate();

    const {axios} = useAxios();
    const {botData, getBotData} = useContext(BotContext);
    const {botId = ""} = useParams();
    const {pathname} = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);


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

    const deleteBot = useCallback(async (id: string) => {
        try {
            const response: AxiosResponse<any, any> = await axios.delete(
                `${apiEndPoints.bots}/${id}`
            );
            navigate(`${routes.myBots}`);
        } catch (error) {
            // Handle error
        }
    }, []);

    return (
        <>
            <Container maxWidth="xl" sx={{margin: 0}}>
                <LayoutBreadcrumbs>
                    <Link to={routes.botsNew}>
                        <IconVrHeadset/>
                    </Link>
                    <Link to={routes.myBots}>My Bots</Link>
                    <Typography component={"span"}>{pageTitle}</Typography>
                </LayoutBreadcrumbs>
                <PageTitle title={pageTitle}>
                    <Grid container spacing={2} alignItems={"center"}>
                        <Grid item xs={12} sx={{display: {lg: "none"}}}>

                            <Button
                                variant="contained"
                                color="secondary"
                                size="small"
                                sx={{mb: {xs: 2, lg: 0}}}
                                fullWidth
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <IconInfoCircle style={{marginRight: 10}}/>
                                Bot Information
                            </Button>
                        </Grid>
                        <Grid item xs={12} lg={"auto"}>
                            <Grid container columns={2} spacing={2}>
                                <Grid item xs={6} lg>
                                    <Tooltip
                                        title="You can delete a bot if it's stopped and does not have any active trade.">
                                        <div>
                                            <Button
                                                variant="outlined"
                                                size="medium"
                                                sx={{mb: {xs: 1, lg: 0}}}
                                                fullWidth
                                                disabled={(loading || !botData.stopped)}
                                                onClick={() => {
                                                    setShowModal(true)
                                                }}
                                            >
                                                <IconPencil style={{width: 20, marginRight: 10}}/>
                                                Delete
                                            </Button>
                                        </div>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={6} lg>
                                    {botData.stopped ? (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="medium"
                                            sx={{mb: {xs: 1, lg: 0}}}
                                            fullWidth
                                            disabled={loading}
                                            onClick={startBot}
                                        >
                                            <IconPlay style={{width: 20, marginRight: 10}}/>
                                            Start Bot
                                        </Button>

                                    ) : (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            sx={{mb: {xs: 2, lg: 0}}}
                                            fullWidth
                                            disabled={loading}
                                            onClick={stopBot}
                                        >
                                            <IconPause style={{width: 20, marginRight: 10}}/>
                                            Stop Bot
                                        </Button>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </PageTitle>
                <HeadBand isOpen={isOpen}/>
                <LinkBar links={botTabs(botId)}/>
                <Outlet/>
            </Container>
            <Modal open={showModal} onClose={() => setShowModal(false)}>
                <>
                    <Grid container justifyContent={"center"} mb={1}>
                        <Grid item xs={"auto"}>
                            <IconModalDelete/>
                        </Grid>
                    </Grid>
                    <Typography component={"h3"} className={classes.modalTitle}>
                        Say goodbye to Bot
                    </Typography>
                    <Typography component={"p"} className={classes.modalDescription}>
                        This bot and all associated data will be gone forever.
                    </Typography>
                    <Grid container spacing={1.75}>
                        <Grid item xs={12} lg={6} order={{xs: 1, lg: 2}}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="error"
                                onClick={() => deleteBot(botId)}
                            >
                                Delete
                            </Button>
                        </Grid>
                        <Grid item xs={12} lg={6} order={{xs: 2, lg: 1}}>
                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </>
            </Modal>
        </>
    );
};

export default InnerTradingPanelLayout;
