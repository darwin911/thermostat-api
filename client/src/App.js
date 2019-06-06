import React from "react";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Thermostat from "./components/Thermostat";
import Controls from "./components/Controls";
import {
  register,
  login,
  setThermostat,
  //eslint-disable-next-line
  getThermostat
} from "./services/api-helper";
import decode from "jwt-decode";
import { withRouter } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Link, Route } from "react-router-dom";
import { Button } from "semantic-ui-react";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.toggleHeating = this.toggleHeating.bind(this);
    this.toggleCooling = this.toggleCooling.bind(this);
    this.toggleOn = this.toggleOn.bind(this);

    this.increaseTemp = this.increaseTemp.bind(this);
    this.lowerTemp = this.lowerTemp.bind(this);

    this.state = {
      isLoggedIn: false,
      currentUser: {
        id: "",
        name: "",
        email: ""
      },
      formData: {
        name: "",
        email: "",
        password: "",
        verificationCode: ""
      },
      thermostat: {
        userId: "",
        id: "",
        temp: 68,
        isHeating: false,
        isCooling: false,
        isOn: false,
        isIdle: true
      },
      roomTemp: 74
    };
  }

  async componentDidMount() {
    this.loadData();
  }

  async loadData() {
    if (this.state.isLoggedIn) {
      setInterval(async () => {
        const token = localStorage.getItem("token");
        if (token) {
          const currentUser = await decode(token);
          const thermostat = await getThermostat({ userId: currentUser.id });
          this.setState({
            currentUser,
            isLoggedIn: true,
            thermostat
          });
        } else {
          this.props.history.push("/");
        }
      }, 5000);
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value
      }
    }));
  }

  async handleSubmit(e) {
    e.preventDefault();
    try {
      const { formData } = this.state;
      const resp = await register(formData);
      if (resp.error) return;
      localStorage.setItem("token", resp.token);
      this.setState({
        isLoggedIn: true,
        currentUser: {
          name: resp.userData.name,
          email: resp.userData.email,
          id: resp.userData.id
        },
        formData: {
          name: "",
          email: "",
          password: "",
          verificationCode: ""
        }
      });
      this.props.history.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  async handleLogin(e) {
    e.preventDefault();
    try {
      const { formData } = this.state;
      const resp = await login(formData);
      localStorage.setItem("token", resp.token);
      this.loadData();
      this.setState({
        formData: {
          email: "",
          password: ""
        }
      });
      this.props.history.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  handleLogout() {
    localStorage.removeItem("token");
    this.setState({
      isLoggedIn: false
    });
  }

  async toggleHeating() {
    const { thermostat, currentUser } = this.state;

    if (thermostat.isOn) {
      this.setState(prevState => {
        if (thermostat.isCooling) {
          return {
            thermostat: {
              ...prevState.thermostat,
              isHeating: !thermostat.isHeating,
              isCooling: false,
              isIdle: false
            }
          };
        } else if (!thermostat.isCooling && thermostat.isHeating) {
          return {
            thermostat: {
              ...prevState.thermostat,
              isHeating: false,
              isIdle: true
            }
          };
        }
        return {
          thermostat: {
            ...prevState.thermostat,
            isHeating: !thermostat.isHeating,
            isIdle: false
          }
        };
      });

      await setThermostat({
        userId: currentUser.id,
        isHeating: !thermostat.isHeating,
        isCooling: false,
        isIdle: thermostat.isHeating ? true : false
      });
    }
  }

  async toggleCooling() {
    const { thermostat, currentUser } = this.state;
    if (thermostat.isOn) {
      this.setState(prevState => {
        if (thermostat.isHeating) {
          return {
            thermostat: {
              ...prevState.thermostat,
              isCooling: !thermostat.isCooling,
              isHeating: false,
              isIdle: false
            }
          };
        } else if (!thermostat.isHeating && thermostat.isCooling) {
          return {
            thermostat: {
              ...prevState.thermostat,
              isCooling: false,
              isIdle: true
            }
          };
        }
        return {
          thermostat: {
            ...prevState.thermostat,
            isCooling: !thermostat.isCooling,
            isIdle: false
          }
        };
      });
      await setThermostat({
        userId: currentUser.id,
        isCooling: !thermostat.isCooling,
        isHeating: false,
        isIdle: thermostat.isCooling ? true : false
      });
    }
  }

  async toggleOn() {
    this.setState(prevState => ({
      thermostat: {
        ...prevState.thermostat,
        isOn: !this.state.thermostat.isOn
      }
    }));
    await setThermostat({
      userId: this.state.currentUser.id,
      isOn: !this.state.thermostat.isOn
    });
  }

  async lowerTemp() {
    await setThermostat({
      userId: this.state.currentUser.id,
      temp: this.state.thermostat.temp - 1
    });
    this.setState(prevState => ({
      thermostat: {
        ...prevState.thermostat,
        temp: this.state.thermostat.temp - 1
      }
    }));
  }

  async increaseTemp() {
    await setThermostat({
      userId: this.state.currentUser.id,
      temp: this.state.thermostat.temp + 1
    });
    this.setState(prevState => ({
      thermostat: {
        ...prevState.thermostat,
        temp: this.state.thermostat.temp + 1
      }
    }));
  }

  render() {
    const { formData, isLoggedIn, thermostat, roomTemp } = this.state;
    return (
      <div className="App">
        <header>
          <h1>Thermostat API</h1>

          {isLoggedIn && (
            <Button size="mini" compact={true} onClick={this.handleLogout}>
              Logout
            </Button>
          )}
        </header>
        {!isLoggedIn ? (
          <>
            <Route
              exact
              path="/"
              component={() => <Link to="/login">Login</Link>}
            />
            <Route
              path="/login"
              render={() => (
                <Login
                  formData={formData}
                  handleChange={this.handleChange}
                  handleLogin={this.handleLogin}
                />
              )}
            />

            <Route
              path="/register"
              render={() => (
                <Register
                  formData={formData}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                />
              )}
            />
          </>
        ) : (
          <main>
            <Thermostat thermostat={thermostat} roomTemp={roomTemp} />
            <Controls
              thermostat={thermostat}
              toggleCooling={this.toggleCooling}
              toggleHeating={this.toggleHeating}
              toggleOn={this.toggleOn}
              lowerTemp={this.lowerTemp}
              increaseTemp={this.increaseTemp}
            />
          </main>
        )}
      </div>
    );
  }
}

export default withRouter(App);
