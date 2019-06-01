import React from "react";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import { register, login } from "./services/api-helper";
import decode from "jwt-decode";
import { withRouter } from "react-router-dom";
// import "semantic-ui-css/semantic.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      isLoggedin: false,
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
        temp: null,
        isHeating: false,
        isCooling: false,
        isOn: false,
        isIdle: false,
        roomTemp: 74
      }
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      const currentUser = await decode(token);
      this.setState({ currentUser, isLoggedIn: true });
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

  render() {
    const { formData, isLoggedIn, currentUser } = this.state;
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
          <p>Welcome {currentUser.name.split(" ")[0]}!</p>
        )}
      </div>
    );
  }
}

export default withRouter(App);
