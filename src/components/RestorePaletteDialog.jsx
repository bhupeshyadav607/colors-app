import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const RestorePaletteDialog = ({ isRestoring }) => {
  const navigate = useNavigate();

  const handleRestore = () => {
    window.localStorage.clear();
    navigate("/");
  };

  return (
    <Dialog open={isRestoring} aria-labelledby="all-palettes-deleted-dialog">
      <DialogTitle id="all-palettes-deleted-dialog">
        Deleted all Palettes!
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          oh ohh!!, Looks like you have deleted all your beautiful palettes.
        </DialogContentText>
        <DialogContentText>
          Go ahead and create a brand new Palette, or, you can restore the
          original palettes by clicking on the button below.
        </DialogContentText>
        <DialogContentText>
          (Note: Please reload the app after restoration)
        </DialogContentText>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/palette/new")}
          >
            Create New Palette
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleRestore}
            autoFocus
          >
            Restore Original
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default RestorePaletteDialog;
