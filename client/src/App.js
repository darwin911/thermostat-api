import React from "react";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Thermostat from "./components/Thermostat";
import Controls from "./components/Controls";
import { register, login, setTemp } from "./services/api-helper";
import decode from "jwt-decode";
import { withRouter } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
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
        temp: "",
        isHeating: false,
        isCooling: false,
        isOn: false,
        isIdle: false
      },
      roomTemp: 74
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      const currentUser = await decode(token);
      this.setState({ currentUser, isLoggedIn: true });
      const thermostat = await setTemp({ userId: currentUser.id });
      console.log(thermostat);
      this.setState({ thermostat });
    } else {
      this.props.history.push("/");
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
          emai: resp.userData.email,
          id: resp.userData.id
        },
        formData: {
          name: "",
          email: "",
          password: "",
          verificationCode: ""
        }
      });
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
      this.setState({
        isLoggedIn: true,
        currentUser: {
          name: resp.userData.name,
          emai: resp.userData.email,
          id: resp.userData.id
        },
        formData: {
          email: "",
          password: ""
        }
      });
    } catch (error) {
      console.log(error);
    }
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
              isCooling: false
            }
          };
        }
        return {
          thermostat: {
            ...prevState.thermostat,
            isHeating: !thermostat.isHeating
          }
        };
      });

      await setTemp({
        userId: currentUser.id,
        isHeating: !thermostat.isHeating,
        isCooling: false
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
              isHeating: false
            }
          };
        }
        return {
          thermostat: {
            ...prevState.thermostat,
            isCooling: !thermostat.isCooling
          }
        };
      });
      await setTemp({
        userId: currentUser.id,
        isCooling: !thermostat.isCooling,
        isHeating: false
      });
    }
  }

  toggleOn() {
    this.setState(prevState => ({
      thermostat: {
        ...prevState.thermostat,
        isOn: !this.state.thermostat.isOn
      }
    }));
  }

  async lowerTemp() {
    await setTemp({
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
    await setTemp({
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
    const { formData, isLoggedIn, thermostat } = this.state;
    return (
      <div className="App">
        <header>
          <h1>Thermostat API</h1>
        </header>
        {!isLoggedIn ? (
          <>
            <Login
              formData={formData}
              handleChange={this.handleChange}
              handleLogin={this.handleLogin}
            />
            <Register
              formData={formData}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
          </>
        ) : (
          <main>
            {/* <p>Welcome {currentUser.name.split(" ")[0]}!</p> */}
            <Thermostat thermostat={thermostat} />
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
