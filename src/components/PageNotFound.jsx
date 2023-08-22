import React from "react";
import { useNavigate } from "react-router-dom";
import { withStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import bg from "../helpers/bg.svg";

const styles = {
  dialog: {
    /* background by SVGBackgrounds.com */
    backgroundColor: "#1819A4",
    backgroundImage: `url(${bg})`,
  },
};

const PageNotFound = ({ classes }) => {
  const navigate = useNavigate();

  return (
    <Dialog
      open={true}
      className={classes.dialog}
      aria-labelledby="wrong-route-dialog"
    >
      <DialogTitle id="wrong-route-dialog">You should NOT be here!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          I think you hit the WRONG ROUTE. Click the button below to go to the
          Home page.
        </DialogContentText>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/")}
            autoFocus
          >
            Let's go HOME
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default withStyles(styles)(PageNotFound);
