import ReactDOM from "react-dom/client";
import App from "./App";

import Form from "./components/Form";
import SubmitAndCLear from "./components/SubmitAndCLear";
import SerialPort from "./components/SerialPort";
import SocketBlock from "./components/socketBlock";
import Status from "./components/Status";
import DGView from "./components/DGView";
import DummyGraph from "./components/DummyGraph";
import SideNav from "./components/SideNavigation";

let divs = [
  Form,
  SubmitAndCLear,
  SerialPort,
  SocketBlock,
  Status,
  DGView,
  DummyGraph,
];
const gridLayout = (i) => {
  switch (i) {
    case 0:
      return "col-span-3";

    case 2:
      return "col-span-2";

    case 5:
      return "col-span-2";

    case 6:
      return "col-span-2";
  }
};

const Bento = () => {
  return (
    <div className="grid auto-rows-min grid-cols-4 gap-3">
      {divs.map((Element, i) => (
        <div
          key={i}
          className={`row-span-1 rounded-lg border-2 border-slate-400/10 bg-white p-4 ${gridLayout(
            i
          )}`}
        >
          {<Element />}
        </div>
      ))}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="max-h-screen flex flex-row gap-4 p-4 min-w-full bg-slate-100 text-slate-900">
    <SideNav /> <Bento />
  </div>
);
