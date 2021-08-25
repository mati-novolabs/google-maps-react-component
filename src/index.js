import React from "react";
import ReactDOM from "react-dom";
import GoogleMap from "./Map";
import * as simulatedData from "./data/simulated.json";

ReactDOM.render(
    <GoogleMap dataSimulated={simulatedData} />,
    document.getElementById("root")
);
