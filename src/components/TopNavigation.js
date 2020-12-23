import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBIcon,
} from "mdbreact";

class TopNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
    };
    this.onClick = this.onClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleToggleClickA = this.handleToggleClickA.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  handleToggleClickA() {
    this.props.onSideNavToggleClick();
  }

  render() {
    const navStyle = {
      paddingLeft: this.props.toggle ? "16px" : "240px",
      transition: "padding-left .3s",
    };
    return (
      <Router>
        <MDBNavbar
          className="flexible-MDBNavbar"
          light
          expand="md"
          scrolling
          fixed="top"
          style={{ zIndex: 3 }}
        >
          <div
            onClick={this.handleToggleClickA}
            key="sideNavToggleA"
            style={{
              lineHeight: "32px",
              marginleft: "1em",
              verticalAlign: "middle",
              cursor: "pointer",
            }}
          >
            <MDBIcon icon="bars" color="white" size="lg" />
          </div>

          <MDBNavbarBrand href="/" style={navStyle}>
            <strong>{this.props.routeName}</strong>
          </MDBNavbarBrand>
          <MDBNavbarNav
            expand="sm"
            right
            style={{ flexDirection: "row" }}
          ></MDBNavbarNav>
        </MDBNavbar>
      </Router>
    );
  }
}

export default TopNavigation;
