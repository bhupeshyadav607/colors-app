import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Picker from "@emoji-mart/react";

export default function PaletteMetaForm(props) {
  const { hideForm, handleSubmit } = props;

  const [stage, setStage] = React.useState("form");
  const [newPaletteName, setNewPaletteName] = React.useState("");

  //   React.useEffect(() => {
  //     ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
  //       props.palettes.every(
  //         ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
  //       );
  //     });
  //   }, []);

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  const handleNewPaletteChange = (evt) => {
    setNewPaletteName(evt.target.value);
  };

  const showEmojiPicker = () => {
    setStage("emoji");
  };

  const savePalette = (emoji) => {
    console.log(emoji.native);
    const newPalette = {
      paletteName: newPaletteName,
      emoji: emoji.native,
    };
    handleSubmit(newPalette);
    setStage("");
  };

  return (
    <div>
      <Dialog open={stage === "emoji"} onClose={hideForm}>
        <DialogTitle>Choose a Palette Emoji</DialogTitle>
        <Picker onEmojiSelect={savePalette} />
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
              label="Palette Name"
              value={newPaletteName}
              name="newPaletteName"
              onChange={handleNewPaletteChange}
              fullWidth
              margin="normal"
              //   validators={["required", "isPaletteNameUnique"]}
              //   errorMessages={["Enter Palette Name", "Name already used"]}
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
}
