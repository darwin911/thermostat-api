import React from "react";
import { Icon } from "semantic-ui-react";

class Thermostat extends React.Component {
  render() {
    const { thermostat, roomTemp } = this.props;

    return (
      <section className="thermostat">
        <article className="display">
          {thermostat.isOn && (
            <>
              {thermostat.isCooling && (
                <p className="status cooling">Cooling</p>
              )}
              {thermostat.isHeating && (
                <p className="status heating">Heating</p>
              )}
              {thermostat.isIdle && <p className="status">Auto</p>}
              <p className="temp">{thermostat.temp}</p>
            </>
          )}
          <span
            style={{ position: "absolute", left: 0, right: 0, bottom: "15%" }}
          >
            <Icon name="thermometer half" />
            {roomTemp} &deg;
          </span>
        </article>
      </section>
    );
  }
}

export default Thermostat;
