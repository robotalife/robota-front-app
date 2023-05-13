import {Box, Grid, Typography} from "@mui/material";
import Button from "../../formElements/Button";
import {IExchange} from "../../../shared/interfaces/exchange";

import classes from "./ExchangeCard.module.scss";
import {IconBinance, IconPencil} from "../../../shared/icons/Icons";
import IndicatorBadge from "../IndicatorBadge";
import {AxiosResponse} from "axios";
import {useEffect, useState} from "react";
import {IPortfolioBalance} from "../../../shared/interfaces/portfolio";
import apiEndPoints from "../../../shared/consts/apiEndpoints";
import useAxios from "../../../shared/hooks/useAxios";

interface Props {
  data: IExchange;
}

const ExchangeCard = ({ data }: Props) => {
    const { axios } = useAxios();
    const [portfolio,setPortfolio] = useState<IPortfolioBalance>({
        balance:'N/A',
    });

  const getBalance  = async () => {
   try{
                const response:AxiosResponse<IPortfolioBalance,any> = await axios.get(
                    `${apiEndPoints.balance}${data.exchangeId}`);
                console.log(response)
       const portfolio = response.data || undefined;
                console.log(portfolio,"portfolio");
       setPortfolio(portfolio);
            }catch (error){
             // Handle error
            }
        };
  useEffect(() => {
    getBalance();
  },[])

  return (
    <Box className={classes.exchangeCard}>
      <Grid
        container
        justifyContent={"space-between"}
        alignItems={"flex-start"}
        sx={{ mb: 3 }}
      >
        <Grid item xs="auto">
          <IconBinance />
        </Grid>
        <Grid item xs="auto">
          <IndicatorBadge>Inactive</IndicatorBadge>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent={"space-between"}
        alignItems={"center"}
        className={classes.borderBottom}
      >
        <Grid item xs="auto">
          <Typography className={classes.name}>{data.exchangeName}</Typography>
          <Typography className={classes.description}>
            {data.exchangeType}
          </Typography>
        </Grid>
        <Grid item xs="auto">
          <Typography className={classes.balance}>{`${portfolio.balance} $`} </Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <Grid item xs={6}>
          <Button variant="outlined" size="small">
            <IconPencil style={{ marginRight: 8, height: 16, width: 16 }} />{" "}
            Update API
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="outlined" size="small">
            Delete Exchange
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExchangeCard;
