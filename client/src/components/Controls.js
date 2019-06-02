import React from "react";
import { Icon } from "semantic-ui-react";

const Controls = ({ thermostat, toggleCooling, toggleHeating, toggleOn }) => {
  return (
    <aside className="controls">
      <button className={thermostat.isOn ? "powerOn" : ""} onClick={toggleOn}>
        <Icon name="power off" />
      </button>
      <button
        className={thermostat.isHeating ? "heating" : ""}
        onClick={toggleHeating}
        disabled={!thermostat.isOn}
      >
        <Icon name="fire" />
      </button>
      <button
        className={thermostat.isCooling ? "cooling" : ""}
        onClick={toggleCooling}
        disabled={!thermostat.isOn}
      >
        <Icon name="snowflake" />
      </button>
      <p className="">{thermostat.isIdle ? "idle" : "---"}</p>
    </aside>
  );
};

export default Controls;
