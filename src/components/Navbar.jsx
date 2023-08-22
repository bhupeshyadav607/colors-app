import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { withStyles } from "@mui/styles";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import icon from "../helpers/icon.png";
import styles from "../styles/NavbarStyles";

const Navbar = (props) => {
  const { level, changeLevel, changeFormat, showingAllColors, classes } = props;

  const [format, setFormat] = useState("hex");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleFormatChange = (e) => {
    setFormat(e.target.value);
    changeFormat(e.target.value);
    setOpen(true);
  };

  const closeSnackbar = () => setOpen(false);

  return (
    <header className={classes.navbar}>
      <div className={classes.logo} onClick={() => navigate("/")}>
        <img src={icon} alt="logo" />
        Color-Picker
      </div>
      {showingAllColors && (
        <div>
          <span>Level: {level}</span>
          <div className={classes.slider}>
            <Slider
              defaultValue={level}
              min={100}
              max={900}
              onChange={changeLevel}
              step={100}
            />
          </div>
        </div>
      )}
      <div className={classes.selectContainer}>
        <Select
          value={format}
          onChange={handleFormatChange}
          id="demo-simple-select-standard"
          variant="standard"
        >
          <MenuItem value="hex">HEX - #ffffff</MenuItem>
          <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
          <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
        </Select>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        message={
          <span id="message-id">Format Changed to {format.toUpperCase()}</span>
        }
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        action={[
          <IconButton
            onClick={closeSnackbar}
            color="inherit"
            key="close"
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </header>
  );
};

export default withStyles(styles)(Navbar);
