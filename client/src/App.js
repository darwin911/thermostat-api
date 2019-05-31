import React from "react";
import "./App.css";
import Register from "./components/Register";
// import "semantic-ui-css/semantic.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
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

  handleSubmit(e) {
    e.preventDefault();
    console.log("handleSubmit");
  }

  render() {
    const { formData } = this.state;
    return (
      <div className="App">
        <header>
          <h1>Thermostat API</h1>
        </header>
        <Register
          formData={formData}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default App;