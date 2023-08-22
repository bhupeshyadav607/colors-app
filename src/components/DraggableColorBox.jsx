import React from "react";
import { SortableElement } from "react-sortable-hoc";
import { withStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "../styles/DraggableColorBoxStyles";

const DraggableColorBox = SortableElement((props) => {
  const { classes, color, name, handleClick } = props;
  return (
    <div className={classes.root} style={{ backgroundColor: color }}>
      <div className={classes.boxContent}>
        <span>{name}</span>
        <DeleteIcon
          className={classes.deleteIcon}
          onClick={handleClick}
          style={{ transition: "all 0.3s ease-in-out" }}
        />
      </div>
    </div>
  );
});

export default withStyles(styles)(DraggableColorBox);
