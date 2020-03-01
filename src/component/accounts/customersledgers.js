import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import Addcustomer from "./addcustomer";
import AutoComplete from "../autocompletion/autocompletion";
import customers from "../../store/Middleware/customers";
import Pagination from "react-js-pagination";
// const customer = (props)=>{
import "./addSupplier.css";

class Customersledgers extends React.Component {
  constructor() {
    super();
    this.state = {
      activePage: 1,
      itemPerPage: 10,
      customer: { id: 0 },
      customers: [],
      area: {}
    };
  }

  updateState = evt => {
    debugger;
    console.log(evt);
    this.state[evt.target.id] = evt.target.value;
    // this.setState(this.state);
    console.log("area", this.state.area);
    let filterdCustomer = this.state.customers.filter(customer => {
      if (evt.target.id === "area") {
        return customer.area._id == evt.target.value;
      } else if (evt.target.id === "customer") {
        return customer.firstName == evt.target.value;
      } else {
        return customer;
      }
    });

    console.log("fl", filterdCustomer);
    if (evt.target.value) {
      this.setState({ customers: filterdCustomer });
    }
  };

  componentDidMount() {
    this.setState({
      customers: this.props.data.customers
    });
  }
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }
  pageNumberHandlerCustledger = e => {
    this.setState({
      itemPerPage: e.target.value
    });
  };

  render() {
    let indexOfLastitem = this.state.activePage * this.state.itemPerPage;
    let indexOfFirstitem = indexOfLastitem - this.state.itemPerPage;
    let renderedCustomer = this.state.customers.slice(
      indexOfFirstitem,
      indexOfLastitem
    );
    console.log("renderes Custoomer", this.state.customers);
    return (
      <section className="app-section">
        <div className="row">
          <div class="input-field col s5">
            <AutoComplete
              property="name"
              // defaultValue="thsisfd"
              defaultValue={this.props.data.customers[0]}
              onChange={(evt, area) => {
                area &&
                  this.updateState({
                    target: {
                      id: "area",
                      value: area._id
                    }
                  });
              }}
              data={this.props.data.areas}
              placeholder="Select Area"
            />
          </div>

          <div class="input-field col s5">
            <AutoComplete
              property="firstName"
              defaultValue={this.props.data.customers[0]}
              onChange={(evt, customer) => {
                customer &&
                  this.updateState({
                    target: {
                      id: "customer",
                      value: customer.firstName
                    }
                  });
              }}
              data={this.state.customers.filter(customer => {
                return customer.area._id == this.state.area;
              })}
              placeholder="Select Customer"
            />
          </div>
        </div>
        <div className="label-head">
    
          <h4 id="moveToUp">
           
            Customers   <span className="customerledger-total">{this.state.customers.length?this.state.customers.length:''}</span></h4>  
          <span className="customerledger-total"></span>
           {this.state.customers.length != 0 ? (
          <div className="pagination-input-style-custledger">
           
              <div className="pagincation-customer">
                <Pagination
                  activePage={this.state.activePage}
                  itemsCountPerPage={renderedCustomer.length}
                  totalItemsCount={this.state.customers.length}
                  pageRangeDisplayed={renderedCustomer.length}
                  onChange={pageNumber => this.handlePageChange(pageNumber)}
                />
              </div>
            
            <div id="page-setting-custledger">
              <select
                id="dropdown-style-custledger"
                onChange={e => {
                  this.pageNumberHandlerCustledger(e);
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
           ) : null}
        </div>
       
        <div>
          <table>
            <thead  className="thead-ledger ">
              <tr>
                <th>SR.</th>
                <th>CODE</th>
                <th>FULL NAME</th>
                {/* <th>COMPANY</th> */}
                <th >PHONE</th>
                <th >ADDRESS</th>
                <th></th>
              </tr>
            </thead>
            <tbody
              className={
                renderedCustomer.length > 6 ? "bodystyle-custledger" : ""
              }
            >
              {renderedCustomer.map((customer, i) => {
                return (
                  <tr className="body-ledger">
                    <td>
                      <b>{i + 1}</b>
                    </td>
                    <td>{customer.code}</td>
                    <td>
                      {customer.firstName + " " + (customer.lastName || "")}
                    </td>
                    {/* <td>{customer.company.name}</td> */}
                    <td className="wd-200">{customer.phone}</td>
                    <td className="wd-200">{customer.address}</td>
                    <td>
                      <Link to={"/customer_details/?id=" + customer._id}>
                        <img className="icon" src="/images/details-icon.png" />
                      </Link>
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
export default connect(store => {
  return {
    data: {
      ...store.customerReducer,
      ...store.areaReducers
    }
  };
})(Customersledgers);
