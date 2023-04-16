import { Box, Grid, ListItem, Typography } from "@mui/material";
import { ReactNode, useEffect } from "react";

import classes from "./HeadBand.module.scss";
import { useParams } from "react-router-dom";
import { AxiosResponse } from "axios";
import useAxios from "../../shared/hooks/useAxios";
import apiEndPoints from "../../shared/consts/apiEndpoints";

interface Props {
  items: {
    title: string;
    item: ReactNode;
  }[];
}

const HeadBand = ({ items }: Props) => {
  const { botId } = useParams();
  const { axios } = useAxios();

  useEffect(() => {
    getTokenData();
    console.log(botId);
  }, []);

  const getTokenData = async () => {
    try {
      const response: AxiosResponse<any, any> = await axios.get(
        apiEndPoints.getTokens(botId as string)
      );

      const data = response.data;
      console.log(data);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <Box className={classes.headBand}>
      <Grid container>
        {items.map((item) => (
          <Grid item xs key={item.title}>
            <Typography className={classes.title}>{item.title}</Typography>
            <div className={classes.item}>
              <div>{item.item}</div>
            </div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HeadBand;
