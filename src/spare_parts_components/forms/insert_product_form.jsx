import React, {Component} from "react";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBSelect,
} from "mdbreact";
import getCurrentDate from "../utils/get_current_date";
import axios from "axios";


class InsertProductForm extends Component {
    state = {
        productName: "",
        categoryName: "",
        productBrand: "",
        productModel: "",
        productCode: "",
        productQuantity: "",
        productSize: "",
        productColor: "",
        productPurchasePrice: "",
        productRetailPrice: "",
        productDiscountPrice: "",
        productStatus: "",
        fileToUpload: "",
        categories: [],
    };

    addCategory = (category) => {
        let {categories} = this.state;
        const newCategory = {text: category, value: category};
        categories = [...categories, newCategory];
        this.setState({categories});
    };

    componentDidMount = () => {
        let {categories} = this.state;
        axios
            .post("http://localhost/spare_parts/show_category.php")
            .then((response) => {
                    if (response.data !== " no record found") {
                        response.data.map((category) => {
                            const newCategory = {text: category.Category_Name, value: category.Category_Name};
                            categories = [...categories, newCategory];
                        });
                        this.setState({categories})
                    }
                }
            );

    };

    onAdd = () => {
        const {onAdd} = this.props;
        const {
            productName,
            categoryName,
            productBrand,
            productColor,
            productSize,
            productPurchasePrice,
            productCode,
            productDiscountPrice,
            productModel,
            productQuantity,
            productRetailPrice,
            productStatus,
            fileToUpload,
        } = this.state;

        const currentTime = getCurrentDate(" ");

        let product = {
            Product_Name: productName,
            Category_Name: categoryName,
            Product_Brand: productBrand,
            Product_Model: productModel,
            Product_Code: productCode,
            Product_Quantity: productQuantity,
            Product_Size: productSize,
            Product_Color: productColor,
            Product_PurchasePrice: productPurchasePrice,
            Product_Retail_Price: productRetailPrice,
            Product_Discounted_Price: productDiscountPrice,
            Product_Status: productStatus,
            Product_Purchase_Date: currentTime,
            fileToUpload: fileToUpload,
        };
        onAdd(product);
    };

    render() {
        return (
            <div>
                <MDBContainer>
                    <MDBRow className="d-flex justify-content-center">
                        <MDBCol sm="12">
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBCardHeader className="form-header blue-gradient rounded">
                                        <h3 className="my-3">
                                            <MDBIcon icon="plus-circle"/> Insert Product
                                        </h3>
                                    </MDBCardHeader>
                                    <form>
                                        <div className="grey-text">
                                            {/*---------- Row 1 ----------*/}
                                            <MDBRow>
                                                <MDBCol sm="4" className="mb-3">
                                                    <MDBInput
                                                        label="Product Name"
                                                        group
                                                        type="text"
                                                        validate
                                                        onChange={(event) =>
                                                            this.setState({productName: event.target.value})
                                                        }
                                                        name="productName"
                                                    />
                                                </MDBCol>
                                                <MDBCol sm="4" className="mb-3">
                                                    {/* TODO: Convert into MDBSelect */}
                                                    <MDBSelect
                                                        search
                                                        options={this.state.categories}
                                                        selected="Choose your option"
                                                        getValue={(val) =>
                                                            this.setState({
                                                                categoryName: val[0],
                                                            })
                                                        }
                                                        label="Select Category"
                                                    />
                                                </MDBCol>
                                                <MDBCol sm="4" className="mb-3">
                                                    <MDBInput
                                                        label="Product Brand"
                                                        group
                                                        type="text"
                                                        validate
                                                        onChange={(event) =>
                                                            this.setState({
                                                                productBrand: event.target.value,
                                                            })
                                                        }
                                                        name="productBrand"
                                                    />
                                                </MDBCol>
                                            </MDBRow>
                                            {/*---------- Row 2 ----------*/}
                                            <MDBRow>
                                                <MDBCol sm="4" className="mb-3">
                                                    <MDBInput
                                                        label="Product Model"
                                                        group
                                                        type="text"
                                                        validate
                                                        onChange={(event) =>
                                                            this.setState({
                                                                productModel: event.target.value,
                                                            })
                                                        }
                                                        name="productModel"
                                                    />
                                                </MDBCol>
                                                <MDBCol sm="4" className="mb-3">
                                                    <MDBInput
                                                        label="Product Code"
                                                        group
                                                        type="text"
                                                        validate
                                                        onChange={(event) =>
                                                            this.setState({
                                                                productCode: event.target.value,
                                                            })
                                                        }
                                                        name="productCode"
                                                    />
                                                </MDBCol>
                                                <MDBCol sm="4" className="mb-3">
                                                    <MDBInput
                                                        label="Product Quantity"
                                                        group
                                                        type="text"
                                                        validate
                                                        onChange={(event) =>
                                                            this.setState({
                                                                productQuantity: event.target.value,
                                                            })
                                                        }
                                                        name="productQuantity"
                                                    />
                                                </MDBCol>
                                            </MDBRow>
                                            {/*---------- Row 3 ----------*/}
                                            <MDBRow>
                                                <MDBCol sm="4" className="mb-3">
                                                    <MDBInput
                                                        label="Product Size"
                                                        group
                                                        type="text"
                                                        validate
                                                        onChange={(event) =>
                                                            this.setState({
                                                                productSize: event.target.value,
                                                            })
                                                        }
                                                        name="productSize"
                                                    />
                                                </MDBCol>
                                                <MDBCol sm="4" className="mb-3">
                                                    <MDBInput
                                                        label="Product Color"
                                                        group
                                                        type="text"
                                                        validate
                                                        onChange={(event) =>
                                                            this.setState({
                                                                productColor: event.target.value,
                                                            })
                                                        }
                                                        name="productColor"
                                                    />
                                                </MDBCol>
                                                <MDBCol sm="4" className="mb-3">
                                                    <MDBInput
                                                        label="Product Purchase Price"
                                                        group
                                                        type="text"
                                                        validate
                                                        onChange={(event) =>
                                                            this.setState({
                                                                productPurchasePrice: event.target.value,
                                                            })
                                                        }
                                                        name="productPurchasePrice"
                                                    />
                                                </MDBCol>
                                            </MDBRow>
                                            {/*---------- Row 4 ----------*/}
                                            <MDBRow>
                                                <MDBCol sm="4" className="mb-3">
                                                    <MDBInput
                                                        label="Product Retail Price"
                                                        group
                                                        type="text"
                                                        validate
                                                        onChange={(event) =>
                                                            this.setState({
                                                                productRetailPrice: event.target.value,
                                                            })
                                                        }
                                                        name="productRetailPrice"
                                                    />
                                                </MDBCol>
                                                <MDBCol sm="4" className="mb-3">
                                                    <MDBInput
                                                        label="Product Discount Price"
                                                        group
                                                        type="text"
                                                        validate
                                                        onChange={(event) =>
                                                            this.setState({
                                                                productDiscountPrice: event.target.value,
                                                            })
                                                        }
                                                        name="productDiscountPrice"
                                                    />
                                                </MDBCol>
                                                <MDBCol sm="4" className="mb-3">
                                                    <MDBInput
                                                        label="Product Status"
                                                        group
                                                        type="text"
                                                        validate
                                                        onChange={(event) =>
                                                            this.setState({
                                                                productStatus: event.target.value,
                                                            })
                                                        }
                                                        name="productStatus"
                                                    />
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow>
                                                <input
                                                    type="file"
                                                    onChange={(event) =>
                                                        this.setState({
                                                            fileToUpload: event.target.files[0],
                                                        })
                                                    }
                                                />
                                                {/* <ImageUploader
                          withIcon={true}
                          buttonText="Choose images"
                          singleImage={true}
                          onChange={(picture) => console.log(picture)}
                          imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                          maxFileSize={5242880}
                          withPreview={true}
                        /> */}
                                            </MDBRow>
                                        </div>
                                        <div className="text-center mt-4"/>
                                    </form>
                                    <MDBBtn
                                        color="light-blue"
                                        className="mb-3"
                                        onClick={this.onAdd}
                                    >
                                        Add
                                    </MDBBtn>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }
}

export default InsertProductForm;
