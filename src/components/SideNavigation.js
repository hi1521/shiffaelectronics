import React from "react";
import {
  MDBSideNavLink,
  MDBSideNavCat,
  MDBSideNavNav,
  MDBSideNav,
  MDBIcon,
} from "mdbreact";

class SideNavigation extends React.Component {
  // render MDBSideNav Link
  rSNL(to, text) {
    return (
      <MDBSideNavLink to={to} onClick={this.props.onLinkClick}>
        {text}
      </MDBSideNavLink>
    );
  }

  render() {
    const { onLinkClick } = this.props;
    return (
      <div className="white-skin">
        <MDBSideNav
          logo="https://mdbootstrap.com/img/Marketing/general/logo/medium/mdb-react.png"
          bg="https://mdbootstrap.com/img/Photos/Others/sidenav4.jpg"
          mask="strong"
          fixed
          breakWidth={this.props.breakWidth}
          triggerOpening={this.props.triggerOpening}
          style={{ transition: "padding-left .3s" }}
        >
          <form role="search" className="search-form">
            <div className="form-group md-form mt-0 pt-1 ripple-parent">
              <input
                type="text"
                placeholder="Search"
                className="form-control"
              />
            </div>
          </form>
          <MDBSideNavNav>
            <MDBSideNavCat name="Manage Stock" id="dashboard-cat" icon="boxes">
              {this.rSNL("/insertproduct", "Insert Product")}
              {this.rSNL("/insertcategory", "Insert category")}
              {this.rSNL("/allproducts", "All Products")}
            </MDBSideNavCat>

            {/* <MDBSideNavCat name='Maps' id='maps-cat' icon='map'>
              {this.rSNL('/maps/google', 'Google')}
              {this.rSNL('/maps/full', 'Full screen map')}
              {this.rSNL('/maps/vector', 'Vector world map')}
            </MDBSideNavCat> */}
            <MDBSideNavCat name="Expanses" id="Expanses" icon="money-bill-alt">
              {this.rSNL("/addexpanses", "Add Expanses")}
              {this.rSNL("/allexpanses", "All Expanses")}
            </MDBSideNavCat>

            <MDBSideNavLink topLevel to="/expanses" onClick={onLinkClick}>
              <MDBIcon icon="bell mr-2" />
              Expanses
            </MDBSideNavLink>

            <MDBSideNavLink topLevel to="/modals" onClick={onLinkClick}>
              <MDBIcon icon="bolt mr-2" />
              Modals
            </MDBSideNavLink>

            <MDBSideNavLink topLevel to="/charts" onClick={onLinkClick}>
              <MDBIcon icon="chart-pie mr-2" />
              Charts
            </MDBSideNavLink>

            <MDBSideNavLink topLevel to="/calendar" onClick={onLinkClick}>
              <MDBIcon icon="calendar-check mr-2" />
              Calendar
            </MDBSideNavLink>

            <MDBSideNavLink topLevel to="/sections" onClick={onLinkClick}>
              <MDBIcon icon="th-large mr-2" />
              Sections
            </MDBSideNavLink>
          </MDBSideNavNav>
        </MDBSideNav>
      </div>
    );
  }
}

export default SideNavigation;
