import React, { useState } from "react";

const Scratch = (props) => {
  const [color, setColor] = useState();
  const size = "100%";

  return (
    <div
      className="tile"
      style={{
        backgroundColor: color,
        borderTop: "8px solid rgba( 255, 255, 255, .5 )",
        borderLeft: "8px solid rgba( 255, 255, 255, .6 )",
        borderBottom: "8px solid rgba( 0, 0, 0, .5 )",
        borderRight: "8px solid rgba( 0, 0, 0, .6 )",
        gridColumn: props.column,
        gridRow: props.row,
        height: size,
        opacity: "100%",
        width: size,
        overflow: "hidden",
        // transition: "all 2s",
      }}
      onMouseEnter={mouseEnter}
    />
  );
  function mouseEnter() {
    const h = Math.floor(Math.random() * 360);
    const s = Math.floor(Math.random() * 20);
    const l = Math.floor(Math.random() * 50) + 40;
    setColor(`hsl(${h}, ${s}%, ${l}%)`);
  }
};

const BasicTile = (props) => {
  const [color, setColor] = useState();

  return (
    <div
      className="tile"
      style={{
        backgroundColor: color,
        gridColumn: props.column,
        gridRow: props.row,
      }}
      onMouseEnter={mouseEnter}
    />
  );
  function mouseEnter() {
    const random = Math.floor(Math.random() * 16777215).toString(16);
    setColor("#" + random);
  }
};

const Pastel = (props) => {
  const [color, setColor] = useState();

  return (
    <div
      className="tile"
      style={{
        backgroundColor: color,
        gridColumn: props.column,
        gridRow: props.row,
        transition: "color 500ms",
      }}
      onMouseEnter={mouseEnter}
    />
  );
  function mouseEnter() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 25) + 70;
    const lightness = Math.floor(Math.random() * 15) + 83;
    const newColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    setColor(newColor);
  }
};

const Neon = (props) => {
  const [active, setActive] = useState();
  const [colorOne, setColorOne] = useState();
  const [colorTwo, setColorTwo] = useState();

  let whiteNeon = {
    borderColor: "#fff",
    borderRadius: "15px",
    borderStyle: "solid",
    borderWidth: "2px",
    boxSizing: "border-box",
    color: "#fff",
    filter: active ? "blur(1px)" : "blur(0px)",
    gridColumn: props.column,
    gridRow: props.row,
    height: "76px",
    opacity: active ? "100%" : "0%",
    transition: "all 2s",
    width: "76px",
  };
  let colorNeon = {
    borderColor: colorOne,
    borderRadius: "15px",
    borderStyle: "solid",
    borderWidth: "6px",
    boxSizing: "border-box",
    filter: active ? "blur(1px)" : "blur(6px)",
    gridColumn: props.column,
    gridRow: props.row,
    height: "80px",
    opacity: active ? "100%" : "0%",
    transition: "all 5s, opacity 2s, filter 2s ease-out, border-color 1s",
    width: "80px",
  };

  return (
    //
    <>
      <div key={1} className="tile" style={colorNeon} />
      <div
        key={2}
        className="tile"
        style={whiteNeon}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
      />
    </>
  );

  function mouseEnter() {
    const hue = Math.floor(Math.random() * 330);
    const newColorOne = `hsl(${hue}, 100%, 60%)`;
    const newColorTwo = `#fff`;
    setActive(1);
    setColorOne(newColorOne);
    setColorTwo(newColorTwo);
  }
  function mouseLeave() {
    setTimeout(() => {
      setActive(0);
    }, 1000);
  }
};

const Tunnels = (props) => {
  const [colorOne, setColorOne] = useState("#222");
  const [colorTwo, setColorTwo] = useState("#222");

  const tiles = [];

  let key = 1;
  let size = 100;
  let delay = 0;
  let alternator = true;
  let zIndex = 0;

  while (size > 0) {
    tiles.push(
      <div
        className="tile"
        style={{
          backgroundColor: alternator ? colorTwo : colorOne,
          boxShadow: "2px 2px 2px #000 inset",
          gridColumn: props.column,
          gridRow: props.row,
          height: size + "%",
          opacity: "30%",
          transition: "all 1s",
          transitionDelay: delay + "ms",
          width: size + "%",
          zIndex: zIndex,
        }}
        key={key}
      />
    );
    key++;
    size -= 25;
    delay += 150;
    alternator = !alternator;
    zIndex += 10;
  }

  return (
    <>
      {tiles}
      <div
        className="tile"
        style={{
          gridColumn: props.column,
          gridRow: props.row,
          zIndex: 200,
        }}
        onMouseEnter={mouseEnter}
      />
    </>
  );
  function mouseEnter() {
    const hue = Math.floor(Math.random() * 330);
    const newColorOne = `hsl(${hue}, 100%, 60%)`;
    const newColorTwo = `hsl(${hue + 20}, 100%, 60%)`;
    setColorOne(newColorOne);
    setColorTwo(newColorTwo);
  }
};

const SoftPlaid = (props) => {
  const [color, setColor] = useState(randomColor());

  return (
    <div
      className="tile"
      style={{
        backgroundColor: color,
        gridColumn: props.column,
        gridRow: props.row,
        height: "135%",
        mixBlendMode: "multiply",
        opacity: "100%",
        width: "135%",
        transition: "all 100ms",
      }}
      onMouseEnter={mouseEnter}
    />
  );
  function mouseEnter() {
    setColor(randomColor());
  }

  function randomColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 60%, 85%)`;
  }
};

const Spectrum = (props) => {
  const [hue, setHue] = useState(props.counter);
  const size = "100%";
  let i = 10;

  return (
    <div
      className="tile"
      style={{
        backgroundColor: `hsl(${hue}, 70%, 60%)`,
        borderBottom: "6px solid rgba( 0, 0, 0, .3 )",
        borderLeft: "6px solid rgba( 255, 255, 255, .4 )",
        borderRight: "6px solid rgba( 0, 0, 0, .4 )",
        borderTop: "6px solid rgba( 255, 255, 255, .3 )",
        gridColumn: props.column,
        gridRow: props.row,
        height: size,
        opacity: "100%",
      }}
      onMouseEnter={mouseEnter}
    />
  );
  function mouseEnter() {
    let newHue = hue + 10;
    newHue = newHue < 360 ? newHue : newHue - 360;
    setHue(newHue);
  }
};

export { Scratch, BasicTile, Neon, Pastel, Tunnels, SoftPlaid, Spectrum };
