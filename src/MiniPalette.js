/** @jsxImportSource @emotion/react */
import React, { PureComponent } from "react";
import { css } from "@emotion/react";
import DeleteIcon from "@mui/icons-material/Delete";

class MiniPalette extends PureComponent {
  constructor(props) {
    super(props);
    this.deletePalette = this.deletePalette.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  deletePalette(e) {
    e.stopPropagation();
    this.props.openDialog(this.props.id);
  }

  handleClick() {
    this.props.goToPalette(this.props.id);
  }

  render() {
    const { paletteName, emoji, colors } = this.props;
    const miniColorBoxes = colors.map((color) => (
      <div
        className="miniColor"
        style={{ backgroundColor: color.color }}
        key={color.name}
        css={{
          height: "25%",
          width: "20%",
          display: "inline-block",
          margin: "0 auto",
          position: "relative",
          marginBottom: "-3.5px",
        }}
      />
    ));

    return (
      <div
        className="MiniPalette"
        css={{
          backgroundColor: "white",
          border: "1px solid black",
          borderRadius: " 5px",
          padding: "0.5rem",
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
          "&:hover svg": {
            opacity: 1,
          },
        }}
        onClick={this.handleClick}
      >
        <DeleteIcon
          className="deleteIcon"
          css={{
            color: "white",
            backgroundColor: "#eb3d30",
            width: "20px",
            height: "20px",
            position: "absolute",
            right: "0px",
            top: "0px",
            padding: "10px",
            zIndex: 10,
            opacity: 0,
            transition: "all 0.3s ease-in-out",
          }}
          onClick={this.deletePalette}
        />

        <div
          className="colors"
          css={{
            backgroundColor: "#dae1e4",
            height: "150px",
            width: "100%",
            borderRadius: "5px",
            overflow: "hidden",
          }}
        >
          {miniColorBoxes}
        </div>
        <h5
          className="title"
          css={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "0",
            color: "black",
            paddingTop: "0.5rem",
            fontSize: "1rem",
            position: "relative",
          }}
        >
          {paletteName}
          <span
            className="emoji"
            css={{
              marginLeft: "0.5rem",
              fontSize: "1.5rem",
            }}
          >
            {emoji}
          </span>
        </h5>
      </div>
    );
  }
}

export default MiniPalette;
