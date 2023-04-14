import { Box, Modal as MUIModal, ModalProps } from "@mui/material";
import classes from "./Modal.module.scss";

interface Props extends ModalProps {}

const Modal = (props: Props) => {
  return (
    <MUIModal {...props} className={classes.modal}>
      <Box className={classes.box}>{props.children}</Box>
    </MUIModal>
  );
};

export default Modal;
