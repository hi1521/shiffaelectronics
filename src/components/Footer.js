import React, { Component } from "react";
import { MDBFooter, MDBBtn } from "mdbreact";

import { MDBLink } from "mdbreact";
import axios from "axios";
import { Redirect } from "react-router";

class Copyrights extends Component {
  state = {
    logout: false,
  };

  onLogout = () => {
    axios
      .post(
        "http://ec2-3-129-60-50.us-east-2.compute.amazonaws.com/spare_parts/logout.php"
      )
      .then((_value) => this.setState({ logout: true }));
  };

  render() {
    if (this.state.logout) return <Redirect to="/login" />;
    return (
      <MDBFooter
        // className={props.className}
        style={{
          ...this.props.style,
          zIndex: 2,
          backgroundColor: "transparent",
        }}
      >
        <MDBLink
          to="/sale"
          target="_blank"
          style={{
            float: "right",
          }}
        >
          <MDBBtn
            size="lg"
            gradient="blue"
            rounded={true}
            style={{
              width: "150px",
              fontWeight: "bold",
            }}
          >
            {/* <MDBIcon icon="bolt" /> */}
            Sale
          </MDBBtn>
        </MDBLink>
        <MDBBtn
          size="lg"
          gradient="blue"
          rounded={true}
          style={{
            width: "150px",
            float: "right",
            marginRight: 50,
            marginTop: 15,
            fontWeight: "bold",
          }}
          onClick={() => this.onLogout()}
        >
          Logout
        </MDBBtn>
      </MDBFooter>
    );
  }
}

export default Copyrights;
