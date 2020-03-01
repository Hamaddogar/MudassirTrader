import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./product.css";
import AddProduct from "./addProduct";
import Pagination from "react-js-pagination";
import middleware from "../../../store/Middleware/products";
import utlities from "../../../utlities";
import UploadModel from "../../upload/uploadModel";
import "./products.css";
import Papa from "papaparse";

// const Product = (this.props)=>{
class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemPerPage: 10,
      targetProduct: {
        company: {},
        category: {}
      },
      openProductForm: false,
      openUploadModel: false
    };
  }
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }
  pageNumberHandlerProduct=(e)=>{
    this.setState({

      itemPerPage:e.target.value
    })

  }
  toggleStatus = product => {
    debugger;
    product.status = !product.status;
    console.log(product.status);
    this.props.toggleState(product);
  };
  deleteProduct = id => {
    let confirm = window.confirm("Confim Delete Product");
    if (confirm) {
      return this.props.deleteProduct(id);
    }
  };
  getData = data => {
    console.log(data);
    console.log(this.props.data.suppliers);
    let newArray = [...data];
    let self = this;

    // setTimeout(() => {
    let index = 0;

    let filterDAta = newArray.filter((element, index) => {
      return element.firstName != "";
    });

    filterDAta.forEach(item => {
      let newIndex = utlities.getID("P", "code", self.props.data.products);
      item.code = "C" + (+newIndex.slice(1) + index);
      index += 1;
    });
    self.props.uploadProduct(filterDAta);
    // alert("Plaese Insert Require Data!");
    // }, 1000);

    self.setState({ openUploadModel: false });
  };
  productname = e => {
    let productname = e.target.value;
    this.setState({
      productname: productname
    });
  };
  selectSupplier = e => {
    let selectSupplier = e.target.value;
    this.setState({
      selectSupplier: selectSupplier
    });
  };
  saveData = (function() {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function(data, fileName) {
      data.forEach(product => {
        delete product._id;
        product.company = product.company._id;
        product.category = product.category._id;
      });
      let csv = Papa.unparse(data),
        // var json = JSON.stringify(data),
        blob = new Blob([csv], { type: "octet/stream" }),
        url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    };
  })();
  render() {
    let indexOfLastitem = this.state.activePage * this.state.itemPerPage;
    let indexOfFirstitem = indexOfLastitem - this.state.itemPerPage;
    let renderedproducts = this.props.data.products.slice(
      indexOfFirstitem,
      indexOfLastitem
    );
    let product_Filter = renderedproducts.filter((product, index) => {
      return (
        product.name
          .toLowerCase()
          .includes(
            this.state.productname ? this.state.productname.toLowerCase() : ""
          ) && product.company.name === this.state.selectSupplier
      );
    });
    console.log(this.props.data);
    //    let [addingProduct, showAddProduct] = useState(false);

    return (
      <section className="app-section">
        {this.state.openUploadModel && (
          <UploadModel
            title="Product"
            getData={this.getData}
            suppliers={this.props.data.suppliers}
            company={this.props.data.companies}
            // company = {this.props.data.companies}
            showAddCustomer={flag => {
              this.setState({
                openUploadModel: false
              });
            }}
            required
          />
        )}
        {this.state.openProductForm ? (
          <AddProduct
            closeMoDEL={this.state.openProductForm}
            product={this.state.targetProduct}
            showAddProduct={() => {
              this.setState({
                targetProduct: {
                  company: {},
                  category: {}
                },
                openProductForm: false
              });
            }}
          />
        ) : null}
        <div className="label-head">
          <img src="/images/label-head.png" />
          <h4
            style={{
              marginLeft: "-25%"
            }}
          >
            Products <span className="poduct-total">{this.props.data.products.length}</span>
          </h4>
          {this.props.data.products.length != 0 ? (
          <div className="pagination-input-style-product">
            <div id="paggination-product">
              <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={renderedproducts.length}
                totalItemsCount={this.props.data.products.length}
                pageRangeDisplayed={renderedproducts.length}
                onChange={pageNumber => this.handlePageChange(pageNumber)}
              />
            </div>
         
           <div id="page-setting-product">
              <select
                id="dropdown-style-product"
                onChange={e => {
                  this.pageNumberHandlerProduct(e);
                }}
                
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                {/* <option value="40">40</option>
                <option value="50">50</option> */}



                </select>
                </div>
</div>
 ) : (
  ""
)}
        </div>
       
        <div className="row">
          <div class="input-field col s3">
            {/* <Autocomplete
      id="combo-box-demo"
      // options="my first option"
      getOptionLabel={option => option.title}
      style={{ width: 300 }}
      renderInput={params => (
        <TextField {...params} label="---Select Supplier---" variant="outlined" fullWidth />
      )}
    /> */}
            <div className="selectSetting">
              <input
                className="selectstyle"
                placeholder="Product Name"
                onChange={e => {
                  this.productname(e);
                }}
              />
            </div>
          </div>
          <div class="input-field col s3">
            <div className="selectSetting">
              <select
                className="selectstyle"
                onChange={e => {
                  this.selectSupplier(e);
                }}
              >
                <option value="" selected>
                  ---Select Supplier ---
                </option>
                {renderedproducts.map((supplier, i) => {
                  return (
                    <option value={supplier.company.name}>
                      {supplier.company.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        <div>
          <table>
            <thead id="thead-product">
              <tr>
                <th className="wd-20">SR.</th>
                <th>CODE</th>
                <th className="wd-200">NAME</th>
                <th>SUPPLIER</th>
                <th>COST</th>
                <th>SHOPKEEPPER PRICE</th>
                <th>MARGIN</th>
                <th>CUSTOMER PRICE</th>
                <th>QTY</th>
                {/* <th>TIME</th> */}
                <th>
                  <img
                    className="icon add-item"
                    style={{ right: "8%" }}
                    src="/images/table-icons/download.png"
                    onClick={() =>
                      this.props.data.products.length
                        ? this.saveData(
                            this.props.data.products,
                            "Products.csv"
                          )
                        : alert("Please Enter Product")
                    }
                  />
                  <img
                    className="icon add-item"
                    style={{ right: "4%" }}
                    src="/images/table-icons/upload-icon.png"
                    onClick={() => this.setState({ openUploadModel: true })}
                  />
                  {/* {this.props.showAddBtn &&   */}
                  <img
                    onClick={() => {
                      // showAddProduct(true)
                      this.setState({
                        targetProduct: {
                          company: {},
                          category: {}
                        },
                        openProductForm: true
                      });
                    }}
                    className="icon add-item"
                    src="/images/add-icon.png"
                  />
                  {/* } */}
                </th>
              </tr>
            </thead>
            <tbody className={(renderedproducts||product_Filter).length>6?"bodystyle-product":""}>
              {/* TBC, product purchasing should be hanlde seperately, inlist  */}

              {product_Filter.length != 0
                ? product_Filter.map((product, i) => {
                    return (
                      <tr id="thead-product">
                        <td className="wd-20">
                          <b>{i + 1}</b>
                        </td>
                        <td>{product.code}</td>
                        <td className="wd-200">{product.name}</td>
                        {/* <td>{product.product.name}</td> */}
                        <td>{product.company.name}</td>
                        <td>{product.cost}</td>
                        <td>{product.shopkeeperPrice}</td>
                        <td>{product.margin}</td>
                        <td>{product.customerPrice}</td>
                        <td>{product.productQty}</td>
                        {/* <td>{product.time}</td> */}
                        <td className="wd-200">
                          <button
                            onClick={() => this.toggleStatus(product)}
                            className={
                              product.status
                                ? "control-btn"
                                : "control-btn disabled-btn"
                            }
                          >
                            {product.status ? "Activate" : "Deactivate"}
                          </button>
                          <img
                            title="Edit"
                            onClick={() => {
                              this.setState({
                                targetProduct: product,
                                openProductForm: true
                              });
                            }}
                            className="icon pointer"
                            src="/images/table-icons/edit-icon.png"
                          />
                          {/* <Link to={"/accountsdetails/" + product.id}>
                        <img className="icon" src="/images/details-icon.png" />
                      </Link> */}
                          <img
                            title="Delete"
                            onClick={() => this.deleteProduct(product._id)}
                            className="icon pointer"
                            src="/images/table-icons/del-icon.png"
                          />
                        </td>
                      </tr>
                    );
                  })
                : renderedproducts.map((product, i) => {
                    return (
                      <tr id="thead-product" >
                        <td className="wd-20">
                          <b>{i + 1}</b>
                        </td>
                        <td>{product.code}</td>
                        <td className="wd-200">{product.name}</td>
                        {/* <td>{product.product.name}</td> */}
                        <td>{product.company.name}</td>
                        <td>{product.cost}</td>
                        <td>{product.shopkeeperPrice}</td>
                        <td>{product.margin}</td>
                        <td>{product.customerPrice}</td>
                        <td>{product.productQty}</td>
                        {/* <td>{product.time}</td> */}
                        <td className="wd-200">
                          <button
                            onClick={() => this.toggleStatus(product)}
                            className={
                              product.status
                                ? "control-btn"
                                : "control-btn disabled-btn"
                            }
                          >
                            {product.status ? "Activate" : "Deactivate"}
                          </button>
                          <img
                            title="Edit"
                            onClick={() => {
                              this.setState({
                                targetProduct: product,
                                openProductForm: true
                              });
                            }}
                            className="icon pointer"
                            src="/images/table-icons/edit-icon.png"
                          />
                          {/* <Link to={"/accountsdetails/" + product.id}>
                        <img className="icon" src="/images/details-icon.png" />
                      </Link> */}
                          <img
                            title="Delete"
                            onClick={() => this.deleteProduct(product._id)}
                            className="icon pointer"
                            src="/images/table-icons/del-icon.png"
                          />
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}
export default connect(
  store => {
    return {
      data: { ...store.productReducers, ...store.supplierReducer }
    };
  },
  dispatch => {
    return {
      toggleState: args => {
        dispatch(middleware.toggleProductState(args));
      },
      createProduct: args => {
        dispatch(middleware.createProduct(args));
      },
      uploadProduct: args => {
        dispatch(middleware.uploadProduct(args));
      },
      deleteProduct: productId => {
        dispatch(middleware.deleteProduct(productId));
      }
    };
  }
)(Product);
