import "./App.css";
import React, {
  useContext,
  useState,
  useTransition,
  useEffect,
  useLayoutEffect,
} from "react";

import ScratchGrid from "./grids/scratchGrid";
import Stacked from "./grids/stacked";
import Subway from "./grids/subway";
import { modes } from "./Modes";

const App = () => {
  const [mode, setMode] = useState(modes[0]);

  const setAlias = (alias) => {
    const newMode = modes.find((e) => e.alias === alias);
    if (newMode) {
      setMode(newMode);
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?mode=${alias}`
      );
    } else console.warn(alias + " is not a valid mode");
  };

  useEffect(() => {
    // Handle mode via URL parameters
    const queryParams = new URLSearchParams(window.location.search);

    const queryMode = queryParams.get("mode");

    if (queryMode) setAlias(queryMode);
  }, []);

  const menuOptions = modes.map((e) => {
    if (!e.hidden)
      return (
        <button
          onClick={() => setAlias(e.alias)}
          disabled={mode.alias === e.alias}
          key={e.alias}
        >
          {e.name}
        </button>
      );
  });

  const Menu = (props) => {
    return (
      <div id="buttons">
        {menuOptions}
        <button
          style={{
            padding: "0",
            lineHeight: "0",
            borderRadius: "50%",
            borderStyle: "default",
          }}
          title="View code on GitHub"
          onClick={() =>
            window.open(
              "https://github.com/tobiasfunction/color-grid",
              "_blank"
            )
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2.5em"
            height="2.5em"
            viewBox="0 0 24 24"
          >
            <path
              fill="#000"
              d="M12 21c-4.963 0-9-4.038-9-9s4.037-9 9-9 9 4.038 9 9-4.037 9-9 9zm0-16c-3.859 0-7 3.14-7 7s3.141 7 7 7 7-3.14 7-7-3.141-7-7-7zm1.565 7.626c.171 0 .316.084.441.255.124.169.187.378.187.625 0 .248-.062.457-.187.626-.125.169-.271.254-.441.254-.181 0-.337-.084-.461-.254-.124-.169-.187-.378-.187-.626s.062-.456.187-.625c.125-.171.281-.255.461-.255m2.21-2.289c.482.522.725 1.155.725 1.898 0 .482-.057.915-.166 1.301a3.196 3.196 0 01-.42.939 2.717 2.717 0 01-.627.635 3.26 3.26 0 01-.685.401c-.208.085-.446.15-.716.196a5.221 5.221 0 01-.606.079l-.44.009-.352.01-.488.011-.488-.011-.352-.01-.44-.009a5.168 5.168 0 01-.606-.079 3.272 3.272 0 01-.716-.196 3.189 3.189 0 01-.684-.401 2.74 2.74 0 01-.628-.635 3.196 3.196 0 01-.42-.939 4.78 4.78 0 01-.166-1.301c0-.743.242-1.376.725-1.898-.053-.026-.056-.286-.008-.782a4.65 4.65 0 01.319-1.37c.602.064 1.343.404 2.23 1.017.3-.078.71-.118 1.233-.118.549 0 .959.04 1.234.118a8.291 8.291 0 011.16-.666c.374-.168.644-.267.814-.293l.254-.058c.172.417.277.875.32 1.37.05.496.047.756-.006.782m-3.754 5.027c1.083 0 1.899-.129 2.454-.39.553-.26.833-.796.833-1.605 0-.469-.176-.861-.529-1.174a1.192 1.192 0 00-.638-.313c-.238-.039-.607-.039-1.104 0-.495.04-.834.058-1.016.058-.248 0-.517-.013-.851-.039l-.783-.049a2.408 2.408 0 00-.616.069 1.235 1.235 0 00-.55.273c-.336.3-.507.691-.507 1.174 0 .809.274 1.345.821 1.605.547.261 1.361.39 2.444.39m-1.524-2.737c.17 0 .316.084.44.255.124.169.187.378.187.625 0 .248-.062.457-.187.626-.124.169-.271.254-.44.254-.182 0-.337-.084-.462-.254-.124-.169-.187-.378-.187-.626s.062-.456.187-.625c.125-.171.28-.255.462-.255"
            ></path>
          </svg>
        </button>
      </div>
    );
  };

  const [windowWidth, windowHeight] = useWindowDimension();

  return (
    <div className="App" style={{ backgroundColor: mode.background }}>
      <Menu />
      <mode.Grid
        mode={mode}
        windowWidth={windowWidth}
        windowHeight={windowHeight}
      />
    </div>
  );
};

// https://stackoverflow.com/a/63010184
function useWindowDimension() {
  const [isPending, startTransition] = useTransition();
  const [dimension, setDimension] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  useLayoutEffect(() => {
    const ResizeHandler = () =>
      startTransition(() =>
        setDimension([window.innerWidth, window.innerHeight])
      );

    window.addEventListener("resize", ResizeHandler);
    return () => window.removeEventListener("resize", ResizeHandler);
  }, []); // Note this empty array. this effect should run only on mount and unmount
  return dimension;
}

export default App;