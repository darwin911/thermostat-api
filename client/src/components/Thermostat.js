import React from "react";

class Thermostat extends React.Component {
  render() {
    const { thermostat } = this.props;
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
      </section>
    );
  }
}

export default Thermostat;
