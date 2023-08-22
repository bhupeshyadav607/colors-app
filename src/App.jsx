import React, { useEffect, useState } from "react";
import { Routes, Route, useParams, useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import seedColors from "./helpers/seedColors";
import Palette from "./components/Palette";
import { generatePalette } from "./helpers/colorHelpers";
import SingleColorPalette from "./components/SingleColorPalette";
import PaletteList from "./components/PaletteList";
import NewPaletteForm from "./components/NewPaletteForm";
import PageNotFound from "./components/PageNotFound";
import Page from "./components/Page";

function App() {
  const defaultTheme = createTheme();
  const location = useLocation();

  const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));

  const [palettes, setPalettes] = useState(savedPalettes || seedColors);

  const findPalette = (id) => {
    return palettes.find((palette) => {
      return palette.id === id;
    });
  };

  const deletePalette = (id) => {
    const leftPalettes = palettes.filter((palette) => palette.id !== id);
    setPalettes(leftPalettes);
  };

  const savePalette = (newPalette) => setPalettes([...palettes, newPalette]);

  useEffect(() => {
    window.localStorage.setItem("palettes", JSON.stringify(palettes));
  }, [palettes]);

  const PaletteWrapper = () => {
    const { id } = useParams();
    const palette = generatePalette(findPalette(id));
    return <Palette palette={palette} />;
  };

  const SingleColorPaletteWrapper = () => {
    const { paletteId, colorId } = useParams();
    const palette = generatePalette(findPalette(paletteId));
    return <SingleColorPalette palette={palette} colorId={colorId} />;
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <TransitionGroup loaction={location}>
        <CSSTransition key={location.key} classNames="page" timeout={500}>
          <Routes location={location}>
            <Route
              path="/"
              element={
                <Page>
                  <PaletteList
                    palettes={palettes}
                    deletePalette={deletePalette}
                  />
                </Page>
              }
            />
            <Route
              path="/palette/new"
              element={
                <Page>
                  <NewPaletteForm
                    savePalette={savePalette}
                    palettes={palettes}
                  />
                </Page>
              }
            />
            <Route
              path="/palette/:id"
              element={
                <Page>
                  <PaletteWrapper />
                </Page>
              }
            />
            <Route
              path="/palette/:paletteId/:colorId"
              element={
                <Page>
                  <SingleColorPaletteWrapper />
                </Page>
              }
            />
            <Route
              path="*"
              element={
                <Page>
                  <PageNotFound />
                </Page>
              }
            />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </ThemeProvider>
  );
}

export default App;
