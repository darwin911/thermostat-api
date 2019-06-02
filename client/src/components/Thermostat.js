import React from "react";
import Controls from "./Controls";

class Thermostat extends React.Component {
  render() {
    const { thermostat, toggleCooling, toggleHeating, toggleOn } = this.props;
    return (
      <section className="thermostat">
        <article className="display">
          <p className="status">
            {thermostat.isCooling ? "Cooling" : ""}
            {thermostat.isHeating ? "Heating" : ""}
            {thermostat.isIdle ? "Idle" : ""}
          </p>
          <p className="temp">{thermostat.temp}</p>
        </article>
        <Controls
          thermostat={thermostat}
          toggleCooling={toggleCooling}
          toggleHeating={toggleHeating}
          toggleOn={toggleOn}
        />
      </section>
    );
  }
}

export default Thermostat;
