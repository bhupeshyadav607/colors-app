import React, { useEffect, useState } from "react";
import { withStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import styles from "../styles/ColorPickerFormStyles";

const ColorPickerForm = (props) => {
  const { paletteIsFull, addNewColor, colors, classes } = props;

  const [currentColor, setCurrentColor] = useState("teal");
  const [newColorName, setNewColorName] = useState("");

  const updateCurrentColor = (newColor) => setCurrentColor(newColor.hex);
  const handleColorNameChange = (e) => setNewColorName(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newColor = { color: currentColor, name: newColorName };
    addNewColor(newColor);
    setNewColorName("");
  };

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
      return colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule("isColorUnique", (value) => {
      return colors.every(({ color }) => color !== currentColor);
    });
  });

  return (
    <div className={classes.root}>
      <ChromePicker
        color={currentColor}
        onChange={updateCurrentColor}
        className={classes.picker}
      />
      <ValidatorForm onSubmit={handleSubmit} instantValidate={false}>
        <TextValidator
          className={classes.colorNameInput}
          name="newColorName"
          placeholder="Color Name"
          variant="filled"
          margin="normal"
          value={newColorName}
          autoComplete="off"
          onChange={handleColorNameChange}
          validators={["required", "isColorNameUnique", "isColorUnique"]}
          errorMessages={[
            "Name the Color Please!!",
            "Color Name must be UNIQUE!",
            "Color already USED!",
          ]}
        />
        <Button
          className={classes.addColor}
          type="submit"
          variant="contained"
          color="primary"
          disabled={paletteIsFull}
          style={{ backgroundColor: paletteIsFull ? "grey" : currentColor }}
        >
          {paletteIsFull ? "PALETTE FULL" : "ADD COLOR"}
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default withStyles(styles)(ColorPickerForm);
