import React, { useState } from "react";

const ListItem = ({
  name,
  number,
  id,
  handleRemoveItems,
  handlePacked,
  packed,
}) => {
  return (
    <div
      style={{
        fontSize: "1.5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1.5rem",
      }}
    >
      <input onClick={() => handlePacked(id)} type="checkbox" value={name} />
      <span
        style={{
          textDecoration: packed && "line-through",
          margin: "0 0.5rem 0 0.5rem ",
        }}
      >
        {number}
      </span>
      <label
        style={{
          textDecoration: packed && "line-through",
          marginRight: "0.5rem",
        }}
      >
        {name}
      </label>
      <span
        onClick={() => handleRemoveItems(id)}
        style={{
          color: "red",
          cursor: "pointer",
          fontSize: "2.5rem",
        }}
      >
        &times;
      </span>
    </div>
  );
};

export default ListItem;
