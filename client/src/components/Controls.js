import React from "react";

const Controls = ({ thermostat, toggleCooling, toggleHeating }) => {
  return (
    <aside className="controls">
      <button
        className={thermostat.isHeating ? "heating" : ""}
        onClick={toggleHeating}
      >
        Heating
      </button>
      <button
        className={thermostat.isCooling ? "cooling" : ""}
        onClick={toggleCooling}
      >
        Cooling
      </button>
      <button>{thermostat.isOn ? "On" : "Off"}</button>
      <p>{thermostat.isIdle ? "idle" : "---"}</p>
    </aside>
  );
};

export default Controls;
