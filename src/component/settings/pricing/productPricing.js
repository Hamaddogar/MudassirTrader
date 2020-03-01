import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import AddArea from "./addArea";
import middleware from "../../../store/Middleware/area";
import Pagination from "react-js-pagination";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import customerMiddleWare from "../../../store/Middleware/products";

import "./pricing.css";
import product from "../products/product";

// import './area.css'

// const Area = (this.propss) => {
class Pricing extends React.Component {
  // let [addingArea, showAddArea] = useState(false);
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemPerPage: 10,

      costupdate: null,
      shopkeeperCostupdate: null,
      costCustomerupdate: null
    };
  }

  state = {
    targetArea: {},
    openAreaForm: false
  };
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }
  pageNumberHandlerProductPrice=(e)=>{
 this.setState({

itemPerPage:e.target.value
 })

  }

  toggleStatus = company => {
    company.status = !company.status;
    this.props.toggleState(company);
  };
  selectSupplier = e => {
    let selectSupplier = e.target.value;
    this.setState({
      selectSupplier: selectSupplier
    });
  };

  selectProduct = e => {
    let selectProduct = e.target.value;
    this.setState({
      selectProduct: selectProduct
    });
  };

  costproduct = (e, product) => {
    let targetValue=e.target.value;
     let   findcost=targetValue.split('-')
     
  
    this.setState({
      costupdate:findcost[0]
    });

    console.log(product.cost);
  };
  costShopSelect = e => {
    let targetshop = e.target.value;
   
     let   findshopPrice=targetshop.split('-')
    this.setState({
      shopkeeperCostupdate:  findshopPrice[0]
    });
  };

  costCustomerSelect = e => {
    let targetcust = e.target.value;
 
    let  findcustPrice=targetcust.split('-')

    this.setState({
      costCustomerupdate: findcustPrice[0]
    });
  };
  savecustomer = (e, product) => {
    product.cost =
      this.state.costupdate === null ? product.cost : this.state.costupdate;
    product.shopkeeperPrice =
      this.state.shopkeeperCostupdate === null
        ? product.shopkeeperPrice
        : this.state.shopkeeperCostupdate;
    product.customerPrice =
      this.state.costCustomerupdate === null
        ? product.customerPrice
        : this.state.costCustomerupdate;

    this.props.createCustomer(product);
  };
  render() {
    let indexOfLastitem = this.state.activePage * this.state.itemPerPage;
    let indexOfFirstitem = indexOfLastitem - this.state.itemPerPage;
    let renderedproducts = this.props.dataProduct.products.slice(
      indexOfFirstitem,
      indexOfLastitem
    );
    let supplier_product_Filter = renderedproducts.filter((item, index) => {
      return (
        item.company.name === this.state.selectSupplier ||
        item.name === this.state.selectProduct
      );
    });


     console.log("store Reducers ",this.props.storedata)
    return (
      <section className="app-section">
        {/* {this.state.openAreaForm ? (
          <AddArea
            area={this.state.targetArea}
            showAddArea={() => {
              this.setState({
                openAreaForm: false
              });
            }}
          />
        ) : null} */}
        <div className="label-head">
          <img src="/images/label-head.png" />
      <h4>Product Pricing  <span className="princing-total">{this.props.dataProduct.products.length}</span></h4>
          {this.props.dataProduct.products.length!=0?
          <div className="pagination-input-style-product-price">
         
          <div className="paggination-pricing">
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={renderedproducts.length}
            totalItemsCount={this.props.dataProduct.products.length}
            pageRangeDisplayed={renderedproducts.length}
            onChange={pageNumber => this.handlePageChange(pageNumber)}
          />
          </div>
     
          <div id="page-setting-product-price">
              <select
                id="dropdown-style-product-price"
                onChange={e => {
                  this.pageNumberHandlerProductPrice(e);
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
                     :''}
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
            <div className="selectSetting-main">
              <select
                className="selectstyle-main"
                onChange={e => {
                  this.selectSupplier(e);
                }}
              >
                <option value="">---Select Supplier---</option>
                {this.props.dataProduct.products.map((product, i) => {
                  return (
                    <option value={product.company.name}>
                      {product.company.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div class="input-field col s3">
            <div className="selectSetting-main">
              <select
                className="selectstyle-main"
                onChange={e => {
                  this.selectProduct(e);
                }}
              >
                <option value="" selected>
                  ---Select Product ---
                </option>
                {this.props.dataProduct.products.map((product, i) => {
                  return <option value={product.name}>{product.name}</option>;
                })}
              </select>
            </div>
          </div>
        </div>

        <div>
          <table>
            <thead id="thead-princing">
              <tr>
                <th className="wd-20">SR.</th>
                <th>CODE</th>
                <th className="wd-200">NAME</th>
                <th>SUPPLIER</th>
                <th>COST</th>
                <th>SHOPKEEPPER PRICE</th>
                {/* <th>MARGIN</th> */}
                <th>CUSTOMER PRICE</th>
                {/* <th>QTY</th> */}
                {/* <th>TIME</th> */}
                <th>
                  {/* {this.props.showAddBtn &&   */}

                  {/* } */}
                </th>
              </tr>
            </thead>
            <tbody  className={renderedproducts.length>6?"bodystyle-product-price":''}>
              {supplier_product_Filter.length != 0
                ? supplier_product_Filter.map((product, i) => {
                  return (
                    <tr id="tbody-princing">
                      <td  className="wd-20" >
                        <b>{i + 1}</b>
                      </td>
                      <td>{product.code}</td>
                      <td className="wd-200">{product.name}</td>
                      {/* <td>{product.product.name}</td> */}
                      <td>{product.company.name}</td>
                      <td>
                        <div className="selectSetting-1">
                          <select
                            className="selectstyle-1"
                            onChange={e => {
                              this.costproduct(e, product);
                            }}
                          >
                            {product.costArray.map((item, index) => {
                               let costget=item.split('-')
                               
                               debugger;
                              return (
                                <option
                                  selected={
                                    product.cost === parseInt(costget[0])
                                      ? "selected"
                                      : ""
                                  }
                                  value={item }
                                >
                                  {item }
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        
                      </td>
                  
              
                      <td>
                        <div className="selectSetting-2">
                          <select
                            className="selectstyle-2"
                            onChange={e => {
                              this.costShopSelect(e);
                            }}
                          >
                            {product.shopkeeperArray.map((item, index) => {
                                  let shopget=item.split('-')
                              return (
                                <option
                                  selected={
                                    product.shopkeeperPrice === parseInt(shopget[0])
                                      ? "selected"
                                      : ""
                                  }
                                  value={item }
                                >
                                  {item }
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </td>
                      {/* <td>{product.margin}</td> */}
                      <td>
                        <div className="selectSetting-3">
                          <select
                            className="selectstyle-3"
                            onChange={e => {
                              this.costCustomerSelect(e);
                            }}
                          >
                            {product.customerArray.map((item, index) => {
                                  let custget=item.split('-')

                              return (
                                <option
                                  selected={
                                    product.customerPrice === parseInt(custget[0])
                                      ? "selected"
                                      : ""
                                  }
                                  value={item }
                                >
                                  {item }
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </td>
                      <td>
                        <img
                          title="Edit"
                          onClick={e => {
                            this.savecustomer(e, product);
                          }}
                          className="icon pointer"
                          src="/images/table-icons/edit-icon.png"
                        />
                      </td>
                    </tr>
                  )
                  })
                : renderedproducts.map((product, i) => {
                    return (
                      <tr id="tbody-princing">
                        <td  className="wd-20" >
                          <b>{i + 1}</b>
                        </td>
                        <td>{product.code}</td>
                        <td className="wd-200">{product.name}</td>
                        {/* <td>{product.product.name}</td> */}
                        <td>{product.company.name}</td>
                        <td>
                          <div className="selectSetting-1">
                            <select
                              className="selectstyle-1"
                              onChange={e => {
                                this.costproduct(e, product);
                              }}
                            >
                              {product.costArray.map((item, index) => {
                                 let costget=item.split('-')
                                 
                                 debugger;
                                return (
                                  <option
                                    selected={
                                      product.cost === parseInt(costget[0])
                                        ? "selected"
                                        : ""
                                    }
                                    value={item }
                                  >
                                    {item }
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          
                        </td>
                    
                
                        <td>
                          <div className="selectSetting-2">
                            <select
                              className="selectstyle-2"
                              onChange={e => {
                                this.costShopSelect(e);
                              }}
                            >
                              {product.shopkeeperArray.map((item, index) => {
                                    let shopget=item.split('-')
                                return (
                                  <option
                                    selected={
                                      product.shopkeeperPrice === parseInt(shopget[0])
                                        ? "selected"
                                        : ""
                                    }
                                    value={item }
                                  >
                                    {item }
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </td>
                        {/* <td>{product.margin}</td> */}
                        <td>
                          <div className="selectSetting-3">
                            <select
                              className="selectstyle-3"
                              onChange={e => {
                                this.costCustomerSelect(e);
                              }}
                            >
                              {product.customerArray.map((item, index) => {
                                    let custget=item.split('-')

                                return (
                                  <option
                                    selected={
                                      product.customerPrice === parseInt(custget[0])
                                        ? "selected"
                                        : ""
                                    }
                                    value={item }
                                  >
                                    {item }
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </td>
                        <td>
                          <img
                            title="Edit"
                            onClick={e => {
                              this.savecustomer(e, product);
                            }}
                            className="icon pointer"
                            src="/images/table-icons/edit-icon.png"
                          />
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>

          {/* Paggination Code */}
        </div>
      </section>
    );
  }
}
const mapDispatchtoProps = dispatch => {
  return {
    createCustomer: data => {
      dispatch(customerMiddleWare.createProduct(data));
    }
  };
};

export default connect(
  store => {
    return {
      dataProduct: store.productReducers,

      storedata:store.storeReducer
    };
  },

  mapDispatchtoProps
)(Pricing);
