/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { SortableElement } from "react-sortable-hoc";
import DeleteIcon from "@mui/icons-material/Delete";

const DraggableColorBox = SortableElement((props) => {
  const { color, name, handleClick } = props;
  return (
    <div
      css={{
        height: "25%",
        width: "20%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-3.5px",
        "&:hover svg": {
          color: "white",
          transform: "scale(1.5)",
        },
      }}
      style={{ backgroundColor: color }}
    >
      <div
        className="boxContent"
        css={{
          position: "absolute",
          width: "100%",
          left: "0px",
          bottom: "0px",
          padding: "10px",
          color: "rgba(0, 0, 0, 0.5)",
          letterSpacing: "1px",
          textTransform: "uppercase",
          fontSize: "12px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>{name}</span>
        <DeleteIcon
          className="deleteIcon"
          css={{
            transition: "all 0.3s ease-in-out",
          }}
          onClick={handleClick}
        />
      </div>
    </div>
  );
});

export default DraggableColorBox;
