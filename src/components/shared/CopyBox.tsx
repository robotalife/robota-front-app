import { Box, Typography } from "@mui/material";
import classes from "./CopytBox.module.scss";
import { IconCopy } from "../../shared/icons/Icons";
import Button from "../formElements/Button";
import { useSnackbar } from "notistack";

interface Props {
  title?: string;
  description?: string;
  copyText: string;
}

const CopyBox = ({ title, description, copyText }: Props) => {
  const { enqueueSnackbar } = useSnackbar();

  const hanldeCopy = () => {
    navigator.clipboard.writeText(copyText);
    enqueueSnackbar("Copied to clipboard.", {
      variant: "info",
      preventDuplicate: true,
    });
  };

  return (
    <Box className={classes.box}>
      <div className={classes.topShelf}>
        <Typography component={"div"} className={classes.title}>
          {title}
        </Typography>
        <Typography component={"div"} className={classes.description}>
          {description}
        </Typography>
        <Typography component={"div"} className={classes.copyText}>
          {copyText}
        </Typography>
      </div>
      <div className={classes.action}>
        <Button variant="outlined" size="small" onClick={hanldeCopy}>
          <IconCopy />
          Copy to Clipboard
        </Button>
      </div>
    </Box>
  );
};

export default CopyBox;
