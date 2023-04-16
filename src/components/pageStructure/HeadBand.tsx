import { Box, Grid, ListItem, Typography } from "@mui/material";
import { ReactNode, useCallback, useEffect, useState } from "react";

import classes from "./HeadBand.module.scss";
import { useParams } from "react-router-dom";
import { AxiosResponse } from "axios";
import useAxios from "../../shared/hooks/useAxios";
import apiEndPoints from "../../shared/consts/apiEndpoints";

interface Props {
  items: {
    title: string;
  }[];
}

interface IBotData {
  createdAt: string;
  createdBy: string;
  exchangeType: string;
  id: string;
  name: string;
  owner: string | null;
  pair: string;
  price: string;
  strategy: "SHORT" | "LONG";
}

const HeadBand = ({ items }: Props) => {
  const { botId } = useParams();
  const { axios } = useAxios();
  const [botData, setBotData] = useState<IBotData>({} as IBotData);

  const getTokenData = useCallback(async () => {
    try {
      const response: AxiosResponse<IBotData, any> = await axios.get(
        apiEndPoints.getBot(botId as string)
      );

      const data = response.data;
      setBotData(data);
    } catch (error) {
      // Handle error
    }
  }, [setBotData]);

  useEffect(() => {
    getTokenData();
  }, [getTokenData]);

  return (
    <Box className={classes.headBand}>
      <Grid container>
        <Grid item xs={6} md={4} lg={3} xl>
          <Typography className={classes.title}>Name</Typography>
          <div className={classes.item}>
            <div>{botData.name}</div>
          </div>
        </Grid>
        <Grid item xs={6} md={4} lg={3} xl>
          <Typography className={classes.title}>Price</Typography>
          <div className={classes.item}>
            <div>{botData.price}</div>
          </div>
        </Grid>
        <Grid item xs={6} md={4} lg={3} xl>
          <Typography className={classes.title}>Exchange</Typography>
          <div className={classes.item}>
            <div>{botData.exchangeType}</div>
          </div>
        </Grid>
        <Grid item xs={6} md={4} lg={3} xl>
          <Typography className={classes.title}>Pair</Typography>
          <div className={classes.item}>
            <div>{botData.pair}</div>
          </div>
        </Grid>
        <Grid item xs={6} md={4} lg={3} xl>
          <Typography className={classes.title}>Strategy</Typography>
          <div className={classes.item}>
            <div>{botData.strategy}</div>
          </div>
        </Grid>
        <Grid item xs={6} md={4} lg={3} xl>
          <Typography className={classes.title}>Created by</Typography>
          <div className={classes.item}>
            <div>{botData.createdBy}</div>
          </div>
        </Grid>
        <Grid item xs={6} md={4} lg={3} xl>
          <Typography className={classes.title}>Started at</Typography>
          <div className={classes.item}>
            <div>{botData.createdAt}</div>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeadBand;
