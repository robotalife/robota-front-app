import { Grid, Typography } from "@mui/material";
import Button from "../formElements/Button";
import { useNavigate } from "react-router-dom";

interface Props {
  currentPage: number;
  totalPages: number;
  previous: () => void;
  next: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

const Pagination = ({
  currentPage,
  totalPages,
  previous,
  next,
  hasNext,
  hasPrevious,
}: Props) => {
  const navigate = useNavigate();

  return (
    <Grid
      container
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{ p: 2 }}
    >
      <Grid item xs={"auto"}>
        <Typography component={"div"}>
          Page {currentPage} of {totalPages}
        </Typography>
      </Grid>
      <Grid item xs={"auto"}>
        <Button
          variant="outlined"
          sx={{ mr: 1 }}
          disabled={!hasPrevious}
          onClick={previous}
        >
          Previous
        </Button>
        <Button variant="outlined" disabled={!hasNext} onClick={next}>
          Next
        </Button>
      </Grid>
    </Grid>
  );
};

export default Pagination;
