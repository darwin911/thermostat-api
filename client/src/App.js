import React from "react";
import "./App.css";
import Register from "./components/Register";
import { register } from "./services/api-helper";
// import "semantic-ui-css/semantic.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

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
      }
    };
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
    const { formData } = this.state;
    e.preventDefault();
    try {
      const resp = await register(formData);
      console.log(resp);
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

  render() {
    const { formData, isLoggedIn } = this.state;
    return (
      <div className="App">
        <header>
          <h1>Thermostat API</h1>
        </header>
        {!isLoggedIn && (
          <Register
            formData={formData}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        )}
      </div>
    );
  }
}

export default App;
