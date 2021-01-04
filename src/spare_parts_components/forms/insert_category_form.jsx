import React, { Component } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBCardHeader,
  MDBBtn,
  MDBInput,
} from "mdbreact";

class InsertCategoryForm extends Component {
  state = {
    name: "",
    status: "",
  };

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  onStatusChange = (event) => {
    this.setState({ status: event.target.value });
  };

  render() {
    const { onAdd } = this.props;
    let { name, status } = this.state;
    return (
      <div>
        <MDBContainer>
          <MDBRow className="d-flex justify-content-center">
            <MDBCol md="6">
              <MDBCard>
                <MDBCardBody>
                  <MDBCardHeader className="form-header blue-gradient rounded">
                    <h3 className="my-3">
                      <MDBIcon icon="plus-circle" /> Insert Category
                    </h3>
                  </MDBCardHeader>
                  <form>
                    <div className="grey-text">
                      <MDBInput
                        label="Category Name"
                        group
                        type="text"
                        validate
                        onChange={this.onNameChange}
                      />
                      <MDBInput
                        label="Category status"
                        group
                        type="text"
                        validate
                        onChange={this.onStatusChange}
                      />
                    </div>

                    <div className="text-center mt-4">
                      <MDBBtn
                        color="light-blue"
                        className="mb-3"
                        onClick={() => {
                          onAdd(name, status);
                          this.setState({
                            name: "",
                            status: "",
                          });
                        }}
                      >
                        Add
                      </MDBBtn>
                    </div>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default InsertCategoryForm;
