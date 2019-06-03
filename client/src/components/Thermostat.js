import React from "react";

class Thermostat extends React.Component {
  render() {
    const { thermostat } = this.props;

    return (
      <section className="thermostat">
        <article className="display">
          {thermostat.isOn && (
            <>
              {thermostat.isCooling && <p className="status cooling">Cooling</p>}
              {thermostat.isHeating && <p className="status heating">Heating</p>}
              {thermostat.isIdle && <p className="status">Auto</p>}
              <p className="temp">{thermostat.temp}</p>
            </>
          )}
        </article>
      </section>
    );
  }
}

export default Thermostat;
