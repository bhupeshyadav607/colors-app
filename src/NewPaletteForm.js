/** @jsxImportSource @emotion/react */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import PaletteMetaForm from "./PaletteMetaForm";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import Button from "@mui/material/Button";
import DraggableColorList from "./DraggableColorList";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ChromePicker } from "react-color";
import { arrayMove } from "react-sortable-hoc";
import seedColors from "./seedColors";

const drawerWidth = 400;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  height: "64px",
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

NewPaletteForm.defaultProps = {
  maxColors: 20,
};

export default function NewPaletteForm(props) {
  const initialColors = seedColors[0].colors;
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [currentColor, setCurrentColor] = React.useState("teal");
  const [colors, setColors] = React.useState(seedColors[0].colors);
  const [newColorName, setNewColorName] = React.useState("");
  const [formShowing, setFormShowing] = React.useState(false);
  //   const [newPaletteName, setNewPaletteName] = React.useState("");

  const paletteIsFull = colors.length >= props.maxColors;

  // componentDidMount() {
  //   ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
  //     colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase());
  //   });
  // };

  //   React.useEffect(() => {
  //     ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
  //       colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase());
  //     });
  //     ValidatorForm.addValidationRule("isColorUnique", (value) => {
  //       colors.every(({ color }) => color !== currentColor);
  //     });
  //     ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
  //       props.palettes.every(
  //         ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
  //       );
  //     });
  //   }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const updateCurrentColor = (newColor) => {
    setCurrentColor(newColor.hex);
  };

  const addNewColor = () => {
    const newColor = {
      color: currentColor,
      name: newColorName,
    };
    setColors([...colors, newColor]);
    setNewColorName("");
  };

  const handleNewColorChange = (evt) => {
    setNewColorName(evt.target.value);
  };

  // const handleNewPaletteChange = (evt) => {
  //   setNewPaletteName(evt.target.value);
  // };

  // const handleChange = (evt) => {
  //   setNewColorName({ [evt.target.name]: evt.target.value });
  //   setNewPaletteName({ [evt.target.name]: evt.target.value });
  // };

  const clearColors = () => {
    setColors([]);
  };

  const addRandomColor = () => {
    //pick random color from existing palettes
    const allColors = props.palettes.map((p) => p.colors).flat();
    let rand;
    let randomColor;
    let isDuplicateColor = true;
    while (isDuplicateColor) {
      rand = Math.floor(Math.random() * allColors.length);
      randomColor = allColors[rand];
      isDuplicateColor = colors.some(
        (color) => color.name === randomColor.name
      );
    }
    setColors([...colors, randomColor]);
  };

  const handleSubmit = (newPalette) => {
    //let newName = newPaletteName;
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
    newPalette.colors = colors;
    props.savePalette(newPalette);
    props.history.push("/");
  };

  const removeColor = (colorName) => {
    setColors(colors.filter((color) => color.name !== colorName));
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors(arrayMove(colors, oldIndex, newIndex));
  };

  const showForm = () => {
    setFormShowing(true);
  };
  const hideForm = () => {
    setFormShowing(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} color="default">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <AddToPhotosIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Create A Palette
          </Typography>
        </Toolbar>
        <div
          className="navBtns"
          css={{
            marginRight: "1rem",
            "& a": {
              textDecoration: "none",
            },
          }}
        >
          {/* <ValidatorForm onSubmit={handleSubmit}>
            <TextValidator
              label="Palette Name"
              value={newPaletteName}
              name="newPaletteName"
              onChange={handleNewPaletteChange}
              //   validators={["required", "isPaletteNameUnique"]}
              //   errorMessages={["Enter Palette Name", "Name already used"]}
            />
            <Button variant="contained" color="primary" type="submit">
              Save Palette
            </Button>
          </ValidatorForm> */}

          <Link to="/">
            <Button
              variant="contained"
              color="secondary"
              className="button"
              css={{
                margin: "0 0.5rem",
              }}
            >
              Go Back
            </Button>
          </Link>
          <Button
            variant="contained"
            onClick={showForm}
            className="button"
            css={{
              margin: "0 0.5rem",
            }}
          >
            Save
          </Button>
        </div>
      </AppBar>
      {formShowing && (
        <PaletteMetaForm
          palettes={props.palettes}
          handleSubmit={handleSubmit}
          hideForm={hideForm}
        />
      )}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <div
          className="container"
          css={{
            width: "90%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Design Your Palette
          </Typography>
          <div
            className="buttons"
            css={{
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={clearColors}
              className="button"
              css={{
                width: "50%",
              }}
            >
              Clear Palette
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={addRandomColor}
              disabled={paletteIsFull}
              className="button"
              css={{
                width: "50%",
              }}
            >
              Random Color
            </Button>
          </div>
          <ChromePicker
            color={currentColor}
            onChangeComplete={updateCurrentColor}
            className="picker"
            css={{
              width: "100% !important",
              marginTop: "2rem",
            }}
          />
          <ValidatorForm onSubmit={addNewColor} useref="form">
            <TextValidator
              value={newColorName}
              name="newColorName"
              placeholder="Color Name"
              variant="filled"
              onChange={handleNewColorChange}
              // validators={["required","isColorNameUnique", "isColorUnique"]}
              // errorMessages={["Enter a color name","Color Name Must Be Unique", "Color already used!"]}
              margin="normal"
              className="colorNameInput"
              css={{
                width: "100%",
                height: "70px",
              }}
            />
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={paletteIsFull}
              style={{ backgroundColor: paletteIsFull ? "grey" : currentColor }}
              className="addColor"
              css={{
                width: "100%",
                padding: "1rem",
                marginTop: "1rem",
                fontSize: "2rem",
              }}
            >
              {paletteIsFull ? "Palette Full" : "Add Color"}
            </Button>
          </ValidatorForm>
        </div>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <DraggableColorList
          colors={colors}
          removeColor={removeColor}
          axis="xy"
          onSortEnd={onSortEnd}
          distance={20}
        />
      </Main>
    </Box>
  );
}
