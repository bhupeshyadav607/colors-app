import chroma from "chroma-js";
import sizes from "../helpers/sizes";

const styles = {
  root: {
    width: "20%",
    height: "25%",
    display: "inline-block",
    position: "relative",
    margin: "-3.5px auto",
    cursor: "pointer",
    marginBottom: "-4px",
    "&:hover svg": {
      color: "white",
      transform: "scale(1.5)",
    },
    [sizes.down("lg")]: {
      width: "25%",
      height: "20%",
    },
    [sizes.down("md")]: {
      width: "50%",
      height: "10%",
    },
    [sizes.down("sm")]: {
      width: "100%",
      height: "5%",
    },
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    padding: "10px",
    bottom: "0px",
    left: "0px",
    color: (props) =>
      chroma(props.color).luminance() <= 0.08
        ? "rgba(255, 255, 255, 0.8)"
        : "rgba(0, 0, 0, 0.8)",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
    display: "flex",
    justifyContent: "space-between",
    "& span": {
      padding: "0 10px",
    },
    "& svg": {
      padding: "0 10px",
    },
  },
  deleteIcon: {},
};

export default styles;
