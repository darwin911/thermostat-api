import React from "react";
import { Icon } from "semantic-ui-react";

const Controls = ({
  thermostat,
  toggleCooling,
  toggleHeating,
  toggleOn,
  lowerTemp,
  increaseTemp
}) => {
  return (
    <aside className="controls">
      <button
        className={(thermostat.isHeating ? "heating" : "") + " control-btn"}
        onClick={toggleHeating}
        disabled={!thermostat.isOn}
      >
        <Icon name="fire" />
      </button>
      <button
        className={(thermostat.isCooling ? "cooling" : "") + " control-btn"}
        onClick={toggleCooling}
        disabled={!thermostat.isOn}
      >
        <Icon name="snowflake" />
      </button>
      <button
        className={(thermostat.isOn ? "powerOn" : "") + " control-btn"}
        onClick={toggleOn}
      >
        <Icon name="power off" />
      </button>
      <button
        className={(thermostat.isOn ? "minus-temp" : "") + " control-btn"}
        onClick={lowerTemp}
        disabled={!thermostat.isOn}
      >
        <Icon name="minus" />
      </button>
      <button
        className={(thermostat.isOn ? "add-temp" : "") + " control-btn"}
        onClick={increaseTemp}
        disabled={!thermostat.isOn}
      >
        <Icon name="plus" />
      </button>

      {/* <p className="">{thermostat.isIdle ? "idle" : "---"}</p> */}
    </aside>
  );
};

export default Controls;
