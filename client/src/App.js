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
  getThermostat
} from "./services/api-helper";
import decode from "jwt-decode";
import { withRouter } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Link, Route } from "react-router-dom";
import {
  Segment,
  Menu,
  Header,
  Container,
  Button,
  Grid
} from "semantic-ui-react";

class App extends React.Component {
  constructor(props) {
    super(props);

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

  loadData = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const currentUser = await decode(token);
      const thermostat = await getThermostat({ userId: currentUser.id });
      this.setState({
        currentUser,
        isLoggedIn: true,
        thermostat
      });
      this.props.history.push(
        `/users/${currentUser.id}/thermostat/${thermostat.id}`
      );
    } else {
      this.props.history.push("/login");
    }
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value
      }
    }));
  };

  handleSubmit = async e => {
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
  };

  handleLogin = async e => {
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
      this.props.history.push("/thermostat");
    } catch (error) {
      console.log(error);
    }
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    this.setState({
      isLoggedIn: false
    });
    this.props.history.push("/login");
  };

  toggleHeating = async () => {
    const { currentUser } = this.state;
    const thermostat = await setThermostat({
      userId: currentUser.id,
      isHeating: !this.state.thermostat.isHeating,
      isCooling: false,
      isIdle: this.state.thermostat.isHeating ? true : false
    });
    this.setState({ thermostat });
  };

  toggleCooling = async () => {
    const thermostat = await setThermostat({
      userId: this.state.currentUser.id,
      isCooling: !this.state.thermostat.isCooling,
      isHeating: false,
      isIdle: this.state.thermostat.isCooling ? true : false
    });
    this.setState({ thermostat });
  };

  toggleOn = async () => {
    const thermostat = await setThermostat({
      userId: this.state.currentUser.id,
      isOn: !this.state.thermostat.isOn
    });
    this.setState({ thermostat });
  };

  lowerTemp = async () => {
    const thermostat = await setThermostat({
      userId: this.state.currentUser.id,
      temp: this.state.thermostat.temp - 1
    });
    this.setState({ thermostat });
  };

  increaseTemp = async () => {
    const thermostat = await setThermostat({
      userId: this.state.currentUser.id,
      temp: this.state.thermostat.temp + 1
    });
    this.setState({ thermostat });
  };

  render() {
    const { formData, isLoggedIn, thermostat, roomTemp } = this.state;
    return (
      <Grid stackable verticalAlign="middle" columns={1} className="App">
        <Grid.Row verticalAlign="center">
          <Menu fixed={"top"} size="large" inverted>
            <Container>
              {isLoggedIn && (
                <>
                  <Menu.Item as="a" active>
                    Home
                  </Menu.Item>
                  <Menu.Item position="right">
                    <Button as="a" onClick={this.handleLogout} inverted>
                      Logout
                    </Button>
                  </Menu.Item>
                </>
              )}
            </Container>
          </Menu>

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
                  <Grid.Column verticalAlign="center">
                    <Login
                      formData={formData}
                      handleChange={this.handleChange}
                      handleLogin={this.handleLogin}
                    />
                  </Grid.Column>
                )}
              />

              <Route
                path="/register"
                render={() => (
                  <Grid.Column verticalAlign="center">
                    <Register
                      formData={formData}
                      handleChange={this.handleChange}
                      handleSubmit={this.handleSubmit}
                    />
                  </Grid.Column>
                )}
              />
            </>
          ) : (
            <Grid.Column>
              <Thermostat thermostat={thermostat} roomTemp={roomTemp} />
              <Controls
                thermostat={thermostat}
                toggleCooling={this.toggleCooling}
                toggleHeating={this.toggleHeating}
                toggleOn={this.toggleOn}
                lowerTemp={this.lowerTemp}
                increaseTemp={this.increaseTemp}
              />
            </Grid.Column>
          )}
        </Grid.Row>
      </Grid>
    );
  }
}

export default withRouter(App);
