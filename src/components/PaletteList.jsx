import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { withStyles } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import { blue, red } from "@mui/material/colors";
import MiniPalette from "./MiniPalette";
import RestorePaletteDialog from "./RestorePaletteDialog";
import styles from "../styles/PaletteListStyles";

const PaletteList = (props) => {
  const { palettes, classes, deletePalette } = props;

  const noPalettes = palettes.length <= 0;

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  const navigate = useNavigate();

  const openDialog = (id) => {
    setOpenDeleteDialog(true);
    setDeletingId(id);
  };
  const closeDialog = () => {
    setOpenDeleteDialog(false);
    setDeletingId("");
  };

  const openRestoreDialog = () => setIsRestoring(true);

  const handleDelete = () => {
    deletePalette(deletingId);
    closeDialog();
  };

  const goToPalette = (id) => navigate(`/palette/${id}`);

  useEffect(() => {
    {
      noPalettes && openRestoreDialog();
    }
  }, [palettes]);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1 className={classes.heading}>React Colors</h1>
          <Link to="/palette/new">Create Palette</Link>
        </nav>
        <TransitionGroup className={classes.palettes}>
          {palettes.map((palette) => (
            <CSSTransition key={palette.id} classNames="fade" timeout={500}>
              <MiniPalette
                key={palette.id}
                {...palette}
                goToPalette={goToPalette}
                openDialog={openDialog}
                id={palette.id}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
      <Dialog
        open={openDeleteDialog}
        aria-labelledby="delete-dialog-title"
        onClose={closeDialog}
      >
        <DialogTitle id="delete-dialog-title">Delete this Palette?</DialogTitle>
        <List>
          <ListItem disablePadding onClick={handleDelete}>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>Delete</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={closeDialog}>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: red[100], color: red[600] }}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>Cancel</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Dialog>
      {isRestoring && <RestorePaletteDialog isRestoring={isRestoring} />}
    </div>
  );
};

export default withStyles(styles)(PaletteList);
