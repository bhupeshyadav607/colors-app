import React, { useState, useEffect } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const PaletteMetaForm = (props) => {
  const { palettes, handleSubmit, hideForm } = props;

  const [stage, setStage] = useState("form");
  const [newPaletteName, setNewPaletteName] = useState("");

  const handlePaletteNameChange = (e) => setNewPaletteName(e.target.value);

  useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
      return palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  });

  const showEmojiPicker = () => setStage("emoji");

  const savePalette = (emoji) => {
    const newPalette = { paletteName: newPaletteName, emoji: emoji.native };
    handleSubmit(newPalette);
    setStage("");
  };

  return (
    <div>
      <Dialog open={stage === "emoji"} onClose={hideForm}>
        <DialogTitle>Choose a Palette Emoji:--</DialogTitle>
        <Picker
          title="Pick a Palette Emoji"
          data={data}
          onEmojiSelect={savePalette}
        />
      </Dialog>
      <Dialog open={stage === "form"} onClose={hideForm}>
        <DialogTitle>Choose a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={showEmojiPicker}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new beautiful palette. Make sure it's
              unique!
            </DialogContentText>

            <TextValidator
              name="newPaletteName"
              label="Palette Name"
              variant="standard"
              autoComplete="off"
              margin="normal"
              fullWidth
              value={newPaletteName}
              onChange={handlePaletteNameChange}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={[
                "Give your Palette a NAME!!",
                "This name already EXISTS!!",
              ]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={hideForm}>Cancel</Button>
            <Button variant="contained" color="primary" type="submit">
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
};

export default PaletteMetaForm;
