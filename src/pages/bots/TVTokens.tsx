import { Grid } from "@mui/material";
import CopyBox from "../../components/shared/CopyBox";

const TVTokens = () => {
  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={6} item>
        <CopyBox
          title="Start Order"
          description="Message for trade start signal"
          copyText={`{  "message_type": "bot",  "bot_id": 10125961,  "email_token": "adf832db-3d82-4ce5-b050-27bab0355839",  "delay_seconds": 0}`}
        ></CopyBox>
      </Grid>
      <Grid xs={12} md={6} item>
        <CopyBox
          title="Close Order"
          description="Message to close order at Market Price"
          copyText={`{  "action": "close_at_market_price",  "message_type": "bot",  "bot_id": 10125961,  "email_token": "adf832db-3d82-4ce5-b050-27bab0355839",  "delay_seconds": 0}`}
        ></CopyBox>
      </Grid>
    </Grid>
  );
};

export default TVTokens;
