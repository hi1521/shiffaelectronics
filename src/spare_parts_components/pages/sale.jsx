import React, { Component } from "react";
import lodash from "lodash";
import SelectSearch from "react-select-search";
import "./sale.css";

import {
  MDBBadge,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBDatePicker,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBTimePicker,
} from "mdbreact";
import axios from "axios";

const Row = ({
  id,
  categoryComponent,
  productComponent,
  quantity,
  price,
  onDelete,
  haveQty,
}) => {
  return (
    <tr>
      <td>{id}</td>
      <td>
        <MDBBadge color="red">
          <MDBIcon
            style={{ cursor: "pointer" }}
            onClick={() => onDelete(id)}
            icon="minus"
            size="2x"
          />
        </MDBBadge>
      </td>
      <td>{categoryComponent(id)}</td>
      <td>{productComponent(id)}</td>
      <td style={{ paddingTop: "1.5rem", textAlign: "center" }}>{haveQty}</td>
      <td>{quantity(id)}</td>
      <td>{price}</td>
    </tr>
  );
};

class SalePage extends Component {
  notSelected = "Chose your option";

  validateData = () => {
    const {
      SelectedProducts,
      SelectedCategory,
      customerAddress,
      customerCNIC,
      customerName,
      customerPhone,
    } = this.state;
    if (
      SelectedCategory.findIndex((value) => {
        return value === this.notSelected;
      }) === 0
    )
      return false;
    if (
      SelectedProducts.findIndex((value) => {
        return value === this.notSelected;
      }) === 0
    )
      return false;
    if (customerName === "") return false;
    if (customerPhone === "") return false;
    if (customerCNIC === "") return false;
    return customerAddress !== "";
  };

  componentWillMount = () => {
    try {
      axios
        .post(
          "http://ec2-3-129-60-50.us-east-2.compute.amazonaws.com/spare_parts/session_checker.php"
        )
        .then((value) => {
          if (value.data === "no record found") return null;
          else if (value.data[0].status !== "1") {
            this.props.history.push("/login");
          }
        });
    } catch (error) {}
  };

  onEnter = () => {
    console.log("I am in the onEnter function");
    if (!this.validateData()) return;
    const {
      SelectedIds,
      SelectedPrices,
      SelectedQty,
      SelectedProducts,
      rowCount,
      subTotal,
      discount,
      total,
      customerName,
      date,
      time,
      customerAddress,
      customerPhone,
      customerCNIC,
    } = this.state;

    //    Data Format
    // {
    //  sno: index
    //  dec: Product Name,
    //  qty: 1 (Quantity)
    //  rate: Price
    // }

    let items = lodash.range(rowCount).map((index) => {
      const qty = SelectedQty[index];
      return {
        sno: index, // Row No.
        desc: SelectedProducts[index], // Product Name
        qty: qty, // Product Quantity
        rate: SelectedPrices[index] / qty, // Product 1 Qty Price
        Product_id: SelectedIds[index], // Product ID
      };
    });
    const data = {
      subTotal: subTotal,
      discount: discount,
      total: total,
      items: items,
      itemsLength: items.length,
      customerName: customerName,
      date: date,
      time: time,
      Customer_Address: customerAddress,
      Customer_Phone: customerPhone,
      Customer_CNIC: customerCNIC,
    };
    // console.log(data);
    this.props.history.push({
      pathname: "/invoice",
      data: data,
    });
  };

  state = {
    isMounted: true,
    customerName: "",
    customerAddress: "",
    customerPhone: "",
    customerCNIC: "",
    date: "",
    time: "",
    rowCount: 1,
    Items: this.onEnter,
    SelectedCategory: [this.notSelected],
    SelectedProducts: [this.notSelected],
    SelectedPrices: [0],
    SelectedQty: [1],
    SelectedIds: [""],
    SelectedHaveQty: [0],
    subTotal: 0,
    discount: 0,
    total: 0,
    categories: [
      // {
      //     text: "Category Name",
      //     value: "Category Value"
      // },
    ],
    products: {
      // Data Format
      // Category_Name: {
      //     Product_Name: {
      //         text: "Product Name",
      //         value: "Product Value"
      //         price: "Product Price"
      //         id: Product_id,
      //         qty: Product_Quantity,
      //     },
      // },
    },
  };

  componentDidMount = async () => {
    let { categories, products } = this.state;
    this.fetchAllCategories();
    this.fetchAllProducts();
    this.setState({ products, categories });
  };

  fetchAllProducts = () => {
    let products = {};

    axios
      .post(
        "http://ec2-3-129-60-50.us-east-2.compute.amazonaws.com/spare_parts/allproducts.php"
      )
      .then((response) => {
        if (response.data !== " no record found") {
          response.data.map((product) => {
            const {
              Product_Name,
              Category_Name,
              Product_Retail_Price,
              id,
              Product_Quantity,
            } = product;
            const newProduct = {};
            newProduct[Product_Name] = {
              name: Product_Name,
              value: Product_Name,
              price: parseInt(Product_Retail_Price),
              id: id,
              qty: Product_Quantity,
            };
            if (!products.hasOwnProperty(product.Category_Name))
              products[Category_Name] = newProduct;
            else
              products[Category_Name][Product_Name] = newProduct[Product_Name];
            return null;
          });
        }
        return null;
      });
    this.setState({ products });
  };

  fetchAllCategories = () => {
    let categories = [];
    axios
      .post(
        "http://ec2-3-129-60-50.us-east-2.compute.amazonaws.com/spare_parts/show_category.php"
      )
      .then((response) => {
        if (response.data !== " no record found") {
          response.data.map((category) => {
            const newCategory = {
              name: category.Category_Name,
              value: category.Category_Name,
            };
            categories = [...categories, newCategory];
            return null;
          });
        }
      });
    this.setState({ categories });
  };

  onAdd = () => {
    const {
      rowCount,
      SelectedCategory,
      SelectedProducts,
      SelectedPrices,
      SelectedQty,
      SelectedIds,
      SelectedHaveQty,
    } = this.state;
    const categories = [...SelectedCategory, this.notSelected];
    const products = [...SelectedProducts, this.notSelected];
    const prices = [...SelectedPrices, 0];
    const ids = [...SelectedIds, "None"];
    const qty = [...SelectedQty, 1];
    const haveQty = [...SelectedHaveQty, 0];
    this.setState({
      rowCount: rowCount + 1,
      SelectedCategory: categories,
      SelectedProducts: products,
      SelectedPrices: prices,
      SelectedHaveQty: haveQty,
      SelectedQty: qty,
      SelectedIds: ids,
    });
  };

  categoryComponent = (id) => {
    const { categories, SelectedCategory } = this.state;
    const index = id - 1;
    return (
      <SelectSearch
        options={categories}
        search={true}
        onChange={(selectedValue) =>
          this.onSelectedCategoryUpdate(index, selectedValue)
        }
        value={SelectedCategory[index]}
        name="Categories"
        placeholder="Choose your Option"
      />
    );
  };

  onSelectedCategoryUpdate = (index, selectedValue) => {
    let { isMounted, discount, SelectedCategory } = this.state;

    if (
      isMounted &&
      typeof selectedValue != "undefined" &&
      selectedValue !== SelectedCategory[index]
    ) {
      SelectedCategory[index] = selectedValue;
      const subTotal = this.computeSubtotal();
      const total = subTotal - discount;
      this.setState({ SelectedCategory, subTotal, total });
    }
  };

  productComponent = (id) => {
    const { products, SelectedProducts, SelectedCategory } = this.state;

    const index = id - 1;
    let options;
    if (products[SelectedCategory[index]]) {
      options = lodash.map(products[SelectedCategory[index]], function (val) {
        return val;
      });
    } else options = [];
    return (
      <SelectSearch
        options={options}
        search={true}
        onChange={(selectedValue) =>
          this.onSelectedProductUpdate(index, selectedValue)
        }
        value={SelectedProducts[index]}
        name="Products"
        placeholder="Choose your Option"
      />
    );
  };
  onSelectedProductUpdate = (index, selectedValue) => {
    let {
      products,
      isMounted,
      discount,
      SelectedProducts,
      SelectedCategory,
      SelectedPrices,
      SelectedIds,
      SelectedHaveQty,
    } = this.state;
    const category = SelectedCategory[index];

    if (
      isMounted &&
      selectedValue !== this.notSelected &&
      typeof selectedValue != "undefined" &&
      selectedValue !== SelectedProducts[index] &&
      typeof category != "undefined"
    ) {
      SelectedProducts[index] = selectedValue;
      SelectedPrices[index] = products[category][selectedValue].price;
      SelectedIds[index] = products[category][selectedValue].id;
      SelectedHaveQty[index] = products[category][selectedValue].qty;
      const subTotal = this.computeSubtotal();
      const total = subTotal - discount;
      this.setState({
        SelectedProducts,
        SelectedIds,
        SelectedPrices,
        SelectedHaveQty,
        subTotal,
        total,
      });
    }
  };

  quantityComponent = (id) => {
    let {
      SelectedQty,
      SelectedProducts,
      SelectedCategory,
      SelectedPrices,
      products,
      subTotal,
      total,
      discount,
      SelectedHaveQty,
    } = this.state;
    const index = id - 1;

    return (
      <MDBInput
        style={{ marginTop: "-1.5rem" }}
        label="Quantity"
        group
        type="number"
        value={SelectedQty[index]}
        validate
        onChange={(event) => {
          const product = SelectedProducts[index];
          const category = SelectedCategory[index];

          if (
            event.target.value !== "" &&
            typeof products[category] != "undefined" &&
            typeof products[category][product] != "undefined"
          ) {
            let quantity = parseInt(event.target.value);
            if (quantity > SelectedHaveQty[index])
              quantity = SelectedHaveQty[index];
            SelectedPrices[index] =
              products[category][product].price * quantity;
            SelectedQty[index] = quantity;
            subTotal = this.computeSubtotal();
            total = subTotal - discount;
            this.setState({ SelectedPrices, SelectedQty, subTotal, total });
          }
        }}
        name="productName"
      />
    );
  };

  onDelete = (id) => {
    const index = id - 1;

    let {
      SelectedProducts,
      SelectedCategory,
      SelectedIds,
      SelectedQty,
      SelectedPrices,
      rowCount,
      subTotal,
      discount,
      total,
    } = this.state;
    const price = SelectedPrices[index];
    SelectedPrices = SelectedPrices.filter((v, i) => i !== index);
    SelectedQty = SelectedQty.filter((v, i) => i !== index);
    SelectedIds = SelectedIds.filter((v, i) => i !== index);
    SelectedCategory = SelectedCategory.filter((v, i) => i !== index);
    SelectedProducts = SelectedProducts.filter((v, i) => i !== index);
    subTotal -= price;
    total = subTotal - discount;
    this.setState({
      SelectedProducts,
      SelectedCategory,
      SelectedIds,
      SelectedQty,
      SelectedPrices,
      rowCount: rowCount - 1,
      subTotal: subTotal,
      total: total,
    });
  };

  onClear = () => {
    this.fetchAllProducts();
    this.fetchAllCategories();
    this.setState({
      customerName: "",
      customerAddress: "",
      customerPhone: "",
      customerCNIC: "",
      date: "",
      time: "",
      rowCount: 1,
      SelectedCategory: [this.notSelected],
      SelectedProducts: [this.notSelected],
      SelectedPrices: [0],
      SelectedQty: [1],
      SelectedIds: [""],
      SelectedHaveQty: [0],
      subTotal: 0,
      discount: 0,
      total: 0,
    });
  };

  computeSubtotal = () => {
    return this.state.SelectedPrices.reduce((val, newVal) => val + newVal);
  };

  render() {
    const {
      rowCount,
      SelectedPrices,
      subTotal,
      total,
      discount,
      SelectedHaveQty,
    } = this.state;
    return (
      <MDBContainer style={{ paddingTop: 50 }}>
        <MDBRow className="d-flex justify-content-center">
          <MDBCol size="12" xl="12">
            <MDBCard>
              <MDBCardBody>
                <MDBCardHeader className="form-header blue-gradient rounded">
                  <h3 className="my-3">
                    <MDBIcon icon="dollar-sign" /> Sale
                  </h3>
                </MDBCardHeader>
                <form>
                  <div className="grey-text">
                    {/*---------- Row 1 ----------*/}
                    <MDBRow>
                      <MDBCol sm="3" className="mb-3">
                        <MDBInput
                          label="Customer Name"
                          group
                          type="text"
                          validate
                          onChange={(event) =>
                            this.setState({ customerName: event.target.value })
                          }
                          name="productName"
                        />
                      </MDBCol>
                      <MDBCol sm="3" className="mb-3">
                        <MDBInput
                          label="Customer Cnic"
                          group
                          type="text"
                          validate
                          onChange={(event) =>
                            this.setState({ customerCNIC: event.target.value })
                          }
                          name="productName"
                        />
                      </MDBCol>
                      <MDBCol sm="3" className="mb-3">
                        <MDBInput
                          label="Customer Phone"
                          group
                          type="text"
                          validate
                          onChange={(event) =>
                            this.setState({ customerPhone: event.target.value })
                          }
                          name="productName"
                        />
                      </MDBCol>
                      <MDBCol sm="3" className="mb-3">
                        <MDBInput
                          label="Customer Address"
                          group
                          type="text"
                          validate
                          onChange={(event) =>
                            this.setState({
                              customerAddress: event.target.value,
                            })
                          }
                          name="productName"
                        />
                      </MDBCol>
                      {/*<MDBCol sm="1" className="mb-3"/>*/}
                    </MDBRow>
                    <MDBRow>
                      <MDBCol sm="2" className="mt-2">
                        <MDBDatePicker
                          getValue={(value) =>
                            this.setState({
                              date: `${value.getDate()}-${value.getMonth()}-${
                                value.getYear() + 1900
                              }`,
                            })
                          }
                        />
                      </MDBCol>
                      {/*<MDBCol sm="1"/>*/}
                      <MDBCol sm="4" className="mb-3">
                        <MDBTimePicker
                          getValue={(value) => this.setState({ time: value })}
                          id={"Time"}
                        />
                      </MDBCol>
                      <MDBCol sm="3">
                        <MDBBtn color="red" onClick={() => this.onAdd()}>
                          Add
                        </MDBBtn>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol>
                        <MDBTable>
                          <MDBTableHead>
                            <tr>
                              <th>#</th>
                              <th />
                              <th>Category</th>
                              <th>Product</th>
                              <th>HaveQty</th>
                              <th>Qty</th>
                              <th>Price</th>
                            </tr>
                          </MDBTableHead>
                          <MDBTableBody>
                            {lodash.range(1, rowCount + 1).map((id) => (
                              <Row
                                key={id}
                                id={id}
                                categoryComponent={this.categoryComponent}
                                productComponent={this.productComponent}
                                price={SelectedPrices[id - 1]}
                                onDelete={this.onDelete}
                                quantity={this.quantityComponent}
                                haveQty={SelectedHaveQty[id - 1]}
                              />
                            ))}
                          </MDBTableBody>
                        </MDBTable>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBInput
                          label="Subtotal "
                          value={subTotal}
                          disabled
                          type="number"
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBInput
                          label="Discount "
                          value={discount}
                          type="number"
                          onChange={(val) => {
                            let disc = 0;
                            if (val.target.value !== "") {
                              disc = parseInt(val.target.value);
                            }
                            const subTotal = this.computeSubtotal();
                            const total = subTotal - disc;
                            this.setState({ discount: disc, subTotal, total });
                          }}
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBInput
                          label="Total "
                          value={total}
                          disabled
                          type="number"
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBBtn onClick={this.onEnter}> Enter Bill </MDBBtn>
                      </MDBCol>
                      <MDBCol sm="3">
                        <MDBBtn onClick={() => {}}> Clear </MDBBtn>
                      </MDBCol>
                    </MDBRow>
                  </div>
                  <div className="text-center mt-4" />
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default SalePage;
