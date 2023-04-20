import { Grid, Typography } from "@mui/material";
import Button from "../formElements/Button";

const Pagination = () => {
  return (
    <Grid
      container
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{ p: 2 }}
    >
      <Grid item xs={"auto"}>
        <Typography component={"div"}>Page 1 of 10</Typography>
      </Grid>
      <Grid item xs={"auto"}>
        <Button variant="outlined" sx={{ mr: 1 }} disabled>
          Previous
        </Button>
        <Button variant="outlined" disabled>
          Next
        </Button>
      </Grid>
    </Grid>
  );
};

export default Pagination;
