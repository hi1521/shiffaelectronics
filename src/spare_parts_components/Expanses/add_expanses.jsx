import React, {Component} from "react";
import {MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow} from "mdbreact";
const axios = require("axios");

class AddExpanses extends Component{
    state = {
        description: "",
        amount: 0,
    }

    onDescriptionChange = (e) =>{
        this.setState({description: e.target.value})
    }

    onAmountChange = (e) => {
        let amount;
        const {value} = e.target;
        if (value !== "") amount = parseInt(value);
        else amount = 0
        this.setState({amount})
    }

    onAdd = () => {
        const { description, amount } = this.state;
        const data = {
             description,
             amount,
        }
        axios.post("http://localhost/spare_parts/add_expanse.php",data)
            .then(_value => {
                this.setState({
                    description: "",
                    amount: 0,
                })
            });
    }

    render() {
        let { description, amount } = this.state;
        return (
            <div>
                <MDBContainer>
                    <MDBRow className="d-flex justify-content-center">
                        <MDBCol md="6">
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBCardHeader className="form-header blue-gradient rounded">
                                        <h3 className="my-3">
                                            <MDBIcon icon="plus-circle" /> Add Expanses
                                        </h3>
                                    </MDBCardHeader>
                                    <form>
                                        <div className="grey-text">
                                            <MDBInput
                                                label="Expanse Description"
                                                group
                                                type="text"
                                                validate
                                                value={description}
                                                onChange={this.onDescriptionChange}
                                            />
                                            <MDBInput
                                                label="Amount"
                                                group
                                                type="number"
                                                validate
                                                value={amount}
                                                onChange={this.onAmountChange}
                                            />
                                        </div>

                                        <div className="text-center mt-4">
                                            <MDBBtn
                                                color="light-blue"
                                                className="mb-3"
                                                onClick={this.onAdd}
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

export default AddExpanses;