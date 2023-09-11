import { Box, Grid, Typography } from '@mui/material';
import Button from '../../formElements/Button';
import { IExchange } from '../../../shared/interfaces/exchange';

import classes from './ExchangeCard.module.scss';
import { IconBinance, IconModalDelete, IconPencil } from '../../../shared/icons/Icons';
import IndicatorBadge from '../IndicatorBadge';
import { AxiosResponse } from 'axios';
import { useCallback, useContext, useEffect, useState } from 'react';
import { IPortfolioBalance } from '../../../shared/interfaces/portfolio';
import apiEndPoints from '../../../shared/consts/apiEndpoints';
import useAxios from '../../../shared/hooks/useAxios';
import Modal from '../Modal';
import useNotify from '../../../shared/hooks/useNotify';
import { ExchangeContext } from '../../../shared/providers/ExchangeProvider';
import { useNavigate } from 'react-router-dom';
import routes from '../../../shared/consts/routes';

interface Props {
  data: IExchange;
  remove: (id: string) => void;
}

const ExchangeCard = ({ data, remove }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const { axios } = useAxios();
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState<IPortfolioBalance>({
    balance: 'N/A',
  });

  const getBalance = useCallback(async () => {
    try {
      const response: AxiosResponse<IPortfolioBalance, any> = await axios.get(`${apiEndPoints.balance}${data.exchangeId}`);
      const portfolio = response.data || undefined;
      setPortfolio(portfolio);
    } catch (error) {
      // Handle error
    }
  }, []);

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <>
      <Box className={classes.exchangeCard}>
        <Grid container justifyContent={'space-between'} alignItems={'flex-start'} sx={{ mb: 3 }}>
          <Grid item xs="auto">
            <IconBinance />
          </Grid>
          <Grid item xs="auto">
            <IndicatorBadge color={'success'}>Active</IndicatorBadge>
          </Grid>
        </Grid>
        <Grid container justifyContent={'space-between'} alignItems={'center'} className={classes.borderBottom}>
          <Grid item xs="auto">
            <Typography className={classes.name}>{data.exchangeName}</Typography>
            <Typography className={classes.description}>{data.exchangeType}</Typography>
          </Grid>
          <Grid item xs="auto">
            <Typography className={classes.balance}>{`${portfolio.balance} $`} </Typography>
          </Grid>
        </Grid>
        <Grid container justifyContent={'space-between'} alignItems={'center'} spacing={2}>
          <Grid item xs>
            <Button
              variant="outlined"
              size="small"
              fullWidth
              onClick={() => navigate(`${routes.exchangeUpdate}/${data.exchangeType.replaceAll(' ', '_')}/${data.label}/s${data.value}`)}
            >
              <IconPencil style={{ marginRight: 8, height: 16, width: 16 }} />
              Update API
            </Button>
          </Grid>
          <Grid item xs>
            <Button variant="outlined" size="small" fullWidth onClick={() => setShowModal(true)}>
              Delete Exchange
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <>
          <Grid container justifyContent={'center'} mb={1}>
            <Grid item xs={'auto'}>
              <IconModalDelete />
            </Grid>
          </Grid>
          <Typography component={'h3'} className={classes.modalTitle}>
            Say goodbye to Binance
          </Typography>
          <Typography component={'p'} className={classes.modalDescription}>
            This exchange and all associated data will be gone forever.
          </Typography>
          <Grid container spacing={1.75}>
            <Grid item xs={12} lg={6} order={{ xs: 1, lg: 2 }}>
              <Button fullWidth variant="contained" color="error" onClick={() => remove(data.exchangeId)}>
                Delete
              </Button>
            </Grid>
            <Grid item xs={12} lg={6} order={{ xs: 2, lg: 1 }}>
              <Button fullWidth variant="outlined" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </>
      </Modal>
    </>
  );
};

export default ExchangeCard;
