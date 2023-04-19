/** @jsxImportSource @emotion/react */
import React, { Component } from "react";
import MiniPalette from "./MiniPalette";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import bg from "./bg.svg";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { blue } from "@mui/material/colors";
import { red } from "@mui/material/colors";

class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDeleteDialog: false,
      deletingId: "",
    };
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.goToPalette = this.goToPalette.bind(this);
  }

  openDialog(id) {
    this.setState({ openDeleteDialog: true, deletingId: id });
  }
  closeDialog() {
    this.setState({ openDeleteDialog: false, deletingId: "" });
  }

  handleDelete() {
    this.props.deletePalette(this.state.deletingId);
    this.closeDialog();
  }

  goToPalette(id) {
    this.props.history.push(`/palette/${id}`);
  }
  render() {
    const { palettes } = this.props;
    const { openDeleteDialog } = this.state;

    // const styles = {
    //   "@global": {
    //     ".fade-exit": {
    //       opacity: 1,
    //     },
    //     ".fade-exit-active": {
    //       opacity: 0,
    //       transition: "opacity 500ms ease-out",
    //     },
    //   },
    // };

    return (
      <div
        className="PaletteList"
        css={{
          height: "100vh",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          /* background by SVGBackgrounds.com */
          backgroundColor: "#350EAA",
          backgroundImage: `url(${bg})`,
          overflow: "scroll",
          ".fade-exit": {
            opacity: 1,
          },
          ".fade-exit-active": {
            opacity: 0,
            transition: "opacity 500ms ease-out",
          },
        }}
      >
        <div
          className="PaletteList-container"
          css={{
            width: "50%",
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            flexWrap: "wrap",
          }}
        >
          <nav
            className="PaletteList-nav"
            css={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              color: "white",
              alignItems: "center",
              "& a": {
                color: "white",
              },
            }}
          >
            <h1
              className="heading"
              css={{
                fontSize: "2rem",
              }}
            >
              React Colors
            </h1>
            <Link to="/palette/new">Create Palette</Link>
          </nav>
          <TransitionGroup
            className="PaletteList-palettes"
            css={{
              boxSizing: "border-box",
              width: "100%",
              display: "grid",
              gridTemplateColumns: "repeat(3, 30%)",
              gridGap: "5%",
            }}
          >
            {palettes.map((palette) => (
              <CSSTransition key={palette.id} classNames="fade" timeout={500}>
                <MiniPalette
                  {...palette}
                  goToPalette={this.goToPalette}
                  openDialog={this.openDialog}
                  key={palette.id}
                  id={palette.id}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        <Dialog
          open={openDeleteDialog}
          aria-labelledby="delete-dialog-title"
          onClose={this.closeDialog}
        >
          <DialogTitle id="delete-dialog-title">
            Delete This Palette?
          </DialogTitle>
          <List>
            <ListItem>
              <ListItemButton onClick={this.handleDelete}>
                <ListItemAvatar>
                  <Avatar
                    style={{ backgroundColor: blue[100], color: blue[600] }}
                  >
                    <CheckIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>Delete</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={this.closeDialog}>
                <ListItemAvatar>
                  <Avatar
                    style={{ backgroundColor: red[100], color: red[600] }}
                  >
                    <CloseIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>Cancel</ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}

export default PaletteList;
