import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@mui/styles";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import styles from "../styles/PaletteStyles";

const SingleColorPalette = (props) => {
  const { palette, colorId, classes } = props;

  const [format, setFormat] = useState("hex");

  const gatherShades = (palette, colorToFiterBy) => {
    let shades = [];
    let allColors = palette.colors;
    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter((color) => color.id === colorToFiterBy)
      );
    }
    return shades.slice(1);
  };

  const _shades = gatherShades(palette, colorId);

  const colorBoxes = _shades.map((color) => (
    <ColorBox
      key={color.name}
      name={color.name}
      background={color[format]}
      showingFullPalette={false}
    />
  ));

  const changeFormat = (val) => setFormat(val);

  return (
    <div className={classes.palette}>
      <Navbar changeFormat={changeFormat} showingAllColors={false} />
      <div className={classes.colors}>
        {colorBoxes}
        <div className={classes.goBack}>
          <Link to={`/palette/${palette.id}`}>Go Back</Link>
        </div>
      </div>
      <PaletteFooter paletteName={palette.paletteName} emoji={palette.emoji} />
    </div>
  );
};

export default withStyles(styles)(SingleColorPalette);
