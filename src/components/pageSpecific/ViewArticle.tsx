import { Grid, Paper, Typography } from '@mui/material';
import styles from './ViewArticle.module.scss';
import Button from '../formElements/Button';

interface Props {
  exchange: string;
  link: string;
}

const ViewArticle = ({ exchange, link }: Props) => {
  return (
    <Paper elevation={0} sx={{ p: 8 }} className={styles.card}>
      <Grid container columnSpacing={5}>
        <Grid item xs={12} lg>
          <Typography component="h3" className={styles.title}>
            How to Create an API key on {exchange}
          </Typography>
          <Typography component="p" className={styles.description}>
            Visit {exchange} website to read this article
          </Typography>
        </Grid>
        <Grid item xs={12} lg="auto">
          <a href={link} target="_blank" rel="noreferrer">
            <Button type="submit" variant="contained" size="small">
              View article
            </Button>
          </a>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ViewArticle;
