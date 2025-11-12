import * as React from "react";
import handleDeleteCard from "../utils/handleDeleteCard";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDeleteCard({open, handleClose, sessionData, setSessionData, idCurrentCard}) {
  return (
    <>
      <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">Are you sure?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="success" onClick={handleClose}>
            Disagree
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              handleDeleteCard(idCurrentCard, sessionData, setSessionData, "admin");
              handleClose();
            }}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
