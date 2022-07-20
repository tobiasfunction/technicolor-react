import { useState } from "react";

export default function (props) {
  const [color, setColor] = useState("#fff");

  return (
    <>
      <div
        className="tile moodRings"
        style={{
          backgroundColor: color,
          gridColumn: props.column,
          gridRow: props.row,
        }}
      />
      <div // Listener tile
        className="tile"
        onMouseEnter={mouseEnter}
        style={{
          gridColumn: props.column,
          gridRow: props.row,
          zIndex: "200",
        }}
      />
    </>
  );

  function mouseEnter() {
    const h = Math.floor(Math.random() * 360);
    const s = Math.floor(Math.random() * 5) + 20;
    const l = Math.floor(Math.random() * 30) + 70;
    setColor(`hsla(${h}, ${s}%, ${l}%, 1)`);
  }
}
