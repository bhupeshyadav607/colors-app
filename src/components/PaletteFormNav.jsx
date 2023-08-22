import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LibraryAdd from "@mui/icons-material/LibraryAdd";
import Button from "@mui/material/Button";
import PaletteMetaForm from "./PaletteMetaForm";
import { Main, AppBar, NavButtons } from "../styles/PaletteFormNavStyles";

const PaletteFormNav = (props) => {
  const { open, palettes, handleSubmit, handleDrawerOpen } = props;

  const [formShowing, setFormShowing] = useState(false);

  const navigate = useNavigate();

  const showForm = () => setFormShowing(true);
  const hideForm = () => setFormShowing(false);

  return (
    <Main>
      {/* <CssBaseline /> */}
      <AppBar position="fixed" color="default" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <LibraryAdd />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Create a Palette
          </Typography>
        </Toolbar>
        <NavButtons>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/")}
          >
            Go Back
          </Button>
          <Button variant="contained" onClick={showForm}>
            Save
          </Button>
        </NavButtons>
      </AppBar>
      {formShowing && (
        <PaletteMetaForm
          palettes={palettes}
          handleSubmit={handleSubmit}
          hideForm={hideForm}
        />
      )}
    </Main>
  );
};

export default PaletteFormNav;
