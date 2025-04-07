import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import timelineItems from "./timelineItems.js";
import { Timeline } from "./components/Timeline.tsx";

function App() {
  return (
    <StrictMode>
      <div className="flex flex-col w-[90rem] m-auto h-[100vh]">
        <h1 className="text-2xl font-bold">Timeline</h1>
        <Timeline items={timelineItems} />
      </div>
    </StrictMode>
  );
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
