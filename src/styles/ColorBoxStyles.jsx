import chroma from "chroma-js";
import sizes from "../helpers/sizes";

export default {
  colorBox: {
    width: "20%",
    height: (props) => (props.showingFullPalette ? "25%" : "50%"),
    display: "inline-block",
    position: "relative",
    margin: "0 auto",
    cursor: "pointer",
    marginBottom: "-4px",
    "&:hover button": {
      opacity: "1",
      cursor: "pointer",
      transition: "0.5s",
    },
    [sizes.down("lg")]: {
      width: "25%",
      height: (props) => (props.showingFullPalette ? "20%" : "33.3333%"),
    },
    [sizes.down("md")]: {
      width: "50%",
      height: (props) => (props.showingFullPalette ? "10%" : "20%"),
    },
    [sizes.down("xs")]: {
      width: "100%",
      height: (props) => (props.showingFullPalette ? "5%" : "10%"),
    },
  },
  copyText: {
    color: (props) =>
      chroma(props.background).luminance() >= 0.5
        ? "rgba(0, 0, 0, 0.5)"
        : "white",
  },
  colorName: {
    color: (props) =>
      chroma(props.background).luminance() <= 0.08
        ? "white"
        : "rgba(0, 0, 0, 0.5)",
  },
  seeMore: {
    color: (props) =>
      chroma(props.background).luminance() >= 0.5
        ? "rgba(0, 0, 0, 0.5)"
        : "white",
    position: "absolute",
    bottom: "0px",
    right: "0px",
    border: "none",
    background: "rgba(255, 255, 255, 0.3)",
    width: "60px",
    height: "30px",
    textAlign: "center",
    lineHeight: "30px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontSize: "13px",
  },
  copyButton: {
    color: (props) =>
      chroma(props.background).luminance() >= 0.5
        ? "rgba(0, 0, 0, 0.5)"
        : "white",
    width: "100px",
    height: "30px",
    position: "absolute",
    display: "inline-block",
    top: "50%",
    left: "50%",
    marginTop: "-15px",
    marginLeft: "-50px",
    textAlign: "center",
    outline: "none",
    background: "rgba(255, 255, 255, 0.3)",
    fontSize: "1rem",
    lineHeight: "30px",
    textTransform: "uppercase",
    border: "none",
    textDecoration: "none",
    opacity: "0",
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    padding: "10px",
    bottom: "0px",
    left: "0px",
    color: "black",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
  },
  copyOverlay: {
    opacity: "0",
    zIndex: "0",
    width: "100%",
    height: "100%",
    transition: "transform 0.6s ease-in-out",
    transform: "scale(0.1)",
  },
  showOverlay: {
    opacity: "1",
    zIndex: "10",
    transform: "scale(50)",
    position: "absolute",
  },
  copyMessage: {
    position: "fixed",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "4rem",
    transform: "scale(0.1)",
    opacity: "0",
    color: "white",
    "& h1": {
      fontWeight: "400",
      textShadow: "1px 2px black",
      textTransform: "uppercase",
      background: "rgba(255, 255, 255, 0.2)",
      width: "100%",
      textAlign: "center",
      marginBottom: "0",
      padding: "1rem",
      [sizes.down("xs")]: {
        fontSize: "6rem",
      },
    },
    "& p": {
      fontSize: "2rem",
      fontWeight: "100",
    },
  },
  showMessage: {
    transform: "scale(1)",
    opacity: "1",
    zIndex: "25",
    transition: "all 0.4s ease-in-out",
    transitionDelay: "0.3s",
  },
};
