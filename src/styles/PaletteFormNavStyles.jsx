import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { DRAWER_WIDTH } from "../helpers/constants";
import sizes from "../helpers/sizes";

const drawerWidth = DRAWER_WIDTH;

const Main = styled("div")(({ theme }) => ({
  display: "flex",
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  height: "64px",
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  [sizes.down("md")]: {
    height: "59.5px",
  },
  [sizes.down("xs")]: {
    height: "55px",
  },
}));

const NavButtons = styled("div")(({ theme }) => ({
  marginRight: "1rem",
  "& Button": {
    margin: "0 0.5rem",
    [sizes.down("xs")]: {
      margin: "0 0.2rem",
      padding: "0.3rem",
    },
  },
  [sizes.down("xs")]: {
    marginRight: "0.5rem",
  },
}));

export { Main, AppBar, NavButtons };
