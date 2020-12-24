import React, { Component } from "react";

import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
} from "mdbreact";

const axios = require("axios");

class LoginPage extends Component {
  state = {
    email: "",
    password: "",
    login: false,
  };

  componentWillMount = () => {
    axios
      .post("http://localhost/spare_parts/session_checker.php")
      .then((value) => {
        if (value.data === "no record found") return null;
        else if (value.data[0].status === "1") {
          this.props.history.push("/");
        }
      });
  };

  onLogin = (val) => {
    const { email, password } = this.state;
    axios
      .post(
        "http://localhost/spare_parts/signin.php",
        JSON.stringify({
          email: email,
        })
      )
      .then((response) => {
        const status = response.data[0].pwd === password;
        // this.setState({email: "", password: ""});
        if (status) {
          axios
            .post("http://localhost/spare_parts/session_create.php", {
              email: email,
            })
            .then((value) => this.setState({ login: true }));
        }
      });
  };

  render() {
    if (this.state.login) this.props.history.push("/");
    const { email, password } = this.state;
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6">
            <MDBCard>
              <div className="header pt-3 grey lighten-2">
                <MDBRow className="d-flex justify-content-start">
                  <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">Log in</h3>
                </MDBRow>
              </div>
              <MDBCardBody className="mx-4 mt-4">
                <MDBInput
                  label="Your email"
                  value={email}
                  group
                  type="text"
                  validate
                  onChange={(event) =>
                    this.setState({ email: event.target.value })
                  }
                />
                <MDBInput
                  label="Your password"
                  value={password}
                  group
                  type="password"
                  validate
                  containerClass="mb-0"
                  onChange={(event) =>
                    this.setState({ password: event.target.value })
                  }
                />
                <p className="font-small grey-text d-flex justify-content-end">
                  Forgot
                  <span className="dark-grey-text font-weight-bold ml-1">
                    Password?
                  </span>
                </p>
                <div className="text-center mb-4 mt-5">
                  <MDBBtn
                    color="danger"
                    type="button"
                    className="btn-block z-depth-2"
                    onClick={() => this.onLogin(true)}
                  >
                    Log in
                  </MDBBtn>
                </div>
                <p className="font-small grey-text d-flex justify-content-center">
                  Don't have an account?
                  <span className="dark-grey-text font-weight-bold ml-1">
                    Sign up
                  </span>
                </p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default LoginPage;
