import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { memo } from "react";

type ConfirmWindowInnerType = {
  isOpen: boolean;
  onClose: () => void;
  textMessage: string;
  textAgreeBtn: string;
  textDisagreeBtn: string;
  handleClickAgreeBtn: () => void;
};

export function ConfirmWindowInner({
  isOpen,
  onClose,
  textMessage,
  textAgreeBtn,
  textDisagreeBtn,
  handleClickAgreeBtn,
}: ConfirmWindowInnerType) {
  console.log("confirm window");
  return (
    <Dialog
      open={isOpen}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {textMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="success" onClick={onClose}>
          {textDisagreeBtn}
        </Button>
        <Button variant="outlined" color="error" onClick={handleClickAgreeBtn}>
          {textAgreeBtn}
        </Button>
      </DialogActions>
    </Dialog>
  );
}


export const ConfirmWindow = memo(ConfirmWindowInner)