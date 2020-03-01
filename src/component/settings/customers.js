import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddCustomer from "./addCustomer";
import Pagination from "react-js-pagination";
import customerMiddleWare from "../../store/Middleware/customers";
import Papa from "papaparse";
import utlities from "../../utlities";
import "./addCustomer.css";
import UploadModel from "../upload/uploadModel";

// const Customer = (props)=>{

class Customer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemPerPage: 10,
      openCustomerForm: false,
      file: "",
      openUploadModel: false,
      data: []
    };
  }
  // componentDidMount() {
  //   this.setState({ code: this.props.data.customers.length });
  // }
  // onChangefile = e => {
  //   console.log(this.state.code);

  //   let self = this;
  //   this.setState({ file: e.target.files[0] }, () => {
  //     console.log(this.state.file);
  //     Papa.parse(this.state.file, {
  //       header: true,
  //       complete: function(results) {
  //         //   console.log(results);
  //         results.data.forEach((item, i) => {
  //           console.log(item);
  //           item.code = utlities.getID(
  //             "CUST",
  //             "code",
  //             self.props.data.customers
  //           );
  //           self.props.createCustomer(item);
  //         });
  //       }
  //     });
  //   });
  // };

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }
  pageNumberHandlerCusotmer=(e)=>{

    this.setState({

      itemPerPage:e.target.value
    })
  }
  deleteCustomer = customerId => {
    let isDelete = window.confirm("Confirm Delete Customer");
    if (isDelete) {
      return  this.props.delCustomer(customerId);
    }
   
  };
  toggleStatus = customer => {
    debugger;
    customer.status = !customer.status;
    console.log(customer.status);
    this.props.createCustomer(customer);
  };
  getData = data => {
    console.log(data);
    let self = this;
    let newArray = [...data];

    debugger;

    let index = 0;

    let filterDAta = newArray.filter((element, index) => {
      return element.firstName != "" && element.area !== ""&& element != undefined;
    });

    filterDAta.forEach(item => {
      let newIndex = utlities.getID("C", "code", self.props.data.customers);
      item.code = "C" + (+newIndex.slice(1) + index);
      index += 1;
    });
    console.log(filterDAta)
    self.props.uploadCsutomers(filterDAta);
    self.setState({ openUploadModel: false });
  };
  selectcustomer = e => {
    let selectcustomer = e.target.value;
    this.setState({
      selectcustomer: selectcustomer
    });
  };
  selectArea = e => {
    let selectArea = e.target.value;
    this.setState({
      selectArea: selectArea
    });
  };
  saveData = (function() {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";

    return function(data, fileName) {
      data.forEach(product => {
        delete product._id;
        delete product.code;
        delete product.__v;
        product.area = product.area.name;
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
    console.log(this.props.data);
    // console.log('code',this.props.data.code)
    let indexOfLastitem = this.state.activePage * this.state.itemPerPage;
    let indexOfFirstitem = indexOfLastitem - this.state.itemPerPage;
    let renderedcustomers = this.props.data.customers.length
      ? this.props.data.customers.slice(indexOfFirstitem, indexOfLastitem)
      : [];
    console.log(renderedcustomers);
    let customer_Filter = renderedcustomers.filter((customer, index) => {
      return (
        customer.firstName.toLowerCase().includes( this.state.selectcustomer?this.state.selectcustomer.toLowerCase():'')  &&
            customer.area.name === this.state.selectArea
      );
    });
    return (
      <section className="app-section">
        
        {this.state.openUploadModel && (
          <UploadModel
            title={"Customer"}
            getData={this.getData}
            area={this.props.data.areas}
            // company={this.props.data.companies}
            // company = {this.props.data.companies}
            showAddCustomer={flag => {
              this.setState({
                openUploadModel: false
              });
            }}
          />
        )}

        {this.state.openCustomerForm && (
          <AddCustomer
            // view={this.state.view?"":this.state.view}
            view={this.state.view}
            customer={this.state.targetCustomer}
            showAddCustomer={flag => {
              this.setState({
                openCustomerForm: false
              });
            }}
          />
        )}
        <div className="label-head">
        
          <img src="/images/label-head.png" />
          <h4
            style={{
              marginLeft: "-30%"
            }}
          >
            Customers  <span  className="totalstyle">{this.props.data.customers.length}</span>
       
          </h4>
          {this.props.data.customers.length != 0 ? (
          <div className="pagination-input-style-customer">

     
            <div className="paggination-setting">
              <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={renderedcustomers.length}
                totalItemsCount={this.props.data.customers.length}
                pageRangeDisplayed={renderedcustomers.length}
                onChange={pageNumber => this.handlePageChange(pageNumber)}
              />
            </div>
          
          <div id="page-setting-customer">
              <select
                id="dropdown-style-customer"
                onChange={e => {
                  this.pageNumberHandlerCusotmer(e);
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
           ) : ""}
        </div>
     

        <div className="row" className="row-mange-class">
          <div className="selectSetting">
            <input
              className="selectstyle"
              onChange={e => {
                this.selectcustomer(e);
              }}
              placeholder="Customer Name"
            />

            <br />
          </div>
          <div className="selectSetting">
            <select
              className="selectstyle"
              onChange={e => {
                this.selectArea(e);
              }}
            >
              <option value="" selected>
                ---Select Area ---
              </option>
              {this.props.data.areas.map((area, i) => {
                return <option value={area.name}>{area.name}</option>;
              })}
            </select>
            <br />
          </div>
        </div>
        <br />
        <div>
          <table>
            <thead id="thead-customer">
              <tr>
                <th>SR.</th>
                <th id="codewidth">CODE</th>
                <th>AREA</th>
                <th>NAME</th>
                <th>PHONE</th>
                <th>ADDRESS</th>
                {/* <th>STATUS</th> */}
                <th>
                  <img
                    className="icon add-item"
                    style={{ right: "8%" }}
                    src="/images/table-icons/download.png"
                    onClick={() =>
                      this.props.data.areas.length
                        ? this.saveData(
                            this.props.data.customers,
                            "Customers.csv"
                          )
                        : alert("Please Enter Customer")
                    }
                  />
                  <img
                    className="icon add-item"
                    style={{ right: "4%" }}
                    src="/images/table-icons/upload-icon.png"
                    onClick={() => this.setState({ openUploadModel: true })}
                  />
                  {/* <input
                    className="icon add-item"
                    type="file"
                    accept=".csv"
                    style={{
                      rig++ht: "4%",
                      width: 35,
                      borderRadius: "50%",
                      opacity: 0
                    }}
                    onChange={this.onChangefile}
                  /> */}
                  {this.props.showAddBtn && (
                    <img
                      onClick={() => {
                        this.setState({
                          targetCustomer: {
                            // company: {},
                            area: {}
                          },
                          openCustomerForm: true
                        });
                      }}
                      className="icon add-item"
                      src="/images/add-icon.png"
                    />
                  )}
                </th>
              </tr>
            </thead>

            <tbody className={(renderedcustomers  || customer_Filter).length > 6 ?"bodystyle-customer":''}>
              {customer_Filter.length != 0
                ? customer_Filter.map((customer, i) => {
                  return (
                    <tr id="body-customer">
                      <td style={{ width: "130px" }}>
                        <b>{i + 1}</b>
                      </td>
                      <td style={{ width: "130px" }}>{customer.code}</td>
                      <td style={{ width: "130px" }}> {customer.area.name}</td>
                      {/* <td>{customer.area.name}</td> */}
                      <td style={{ width: "130px" }}> {customer.firstName}</td>
                      {/* <td>{customer.company.name}</td> */}
                      {/* <td>{customer.company.name}</td> */}
                      <td style={{ width: "150px" }}> {customer.phone}</td>
                      <td  >{customer.address}</td>
                      <td style={{ width: "170px" }}>
                        <button
                          onClick={() => this.toggleStatus(customer)}
                          className={
                            customer.status
                              ? "control-btn"
                              : "control-btn disabled-btn"
                          }
                        >
                          {customer.status ? "Activate" : "Deactivate"}
                        </button>
                        <img
                          title="Edit"
                          onClick={() => {
                            this.setState({
                              targetCustomer: customer,
                              openCustomerForm: true,
                              view: false
                            });
                          }}
                          className="icon pointer"
                          src="/images/table-icons/edit-icon.png"
                        />

                        <img
                          title="View"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            this.setState({
                              targetCustomer: customer,
                              openCustomerForm: true,
                              view: true
                            });
                          }}
                          className="icon"
                          src="/images/details-icon.png"
                        />
                        <img
                          data-test={customer._id}
                          style={{ cursor: "pointer" }}
                          onClick={() => this.deleteCustomer(customer._id)}
                          className="icon"
                          src="/images/table-icons/del-icon.png"
                        />
                      </td>
                    </tr>
                    );
                  })
                : renderedcustomers.map((customer, i) => {
                    return (
                      <tr id="body-customer">
                        <td style={{ width: "130px" }}>>
                          <b>{i + 1}</b>
                        </td>
                        <td style={{ width: "130px" }}>{customer.code}</td>
                        <td style={{ width: "130px" }}> {customer.area.name}</td>
                        {/* <td>{customer.area.name}</td> */}
                        <td style={{ width: "130px" }}> {customer.firstName}</td>
                        {/* <td>{customer.company.name}</td> */}
                        {/* <td>{customer.company.name}</td> */}
                        <td style={{ width: "150px" }}> {customer.phone}</td>
                        <td  >{customer.address}</td>
                        <td style={{ width: "170px" }}>
                          <button
                            onClick={() => this.toggleStatus(customer)}
                            className={
                              customer.status
                                ? "control-btn"
                                : "control-btn disabled-btn"
                            }
                          >
                            {customer.status ? "Activate" : "Deactivate"}
                          </button>
                          <img
                            title="Edit"
                            onClick={() => {
                              this.setState({
                                targetCustomer: customer,
                                openCustomerForm: true,
                                view: false
                              });
                            }}
                            className="icon pointer"
                            src="/images/table-icons/edit-icon.png"
                          />

                          <img
                            title="View"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              this.setState({
                                targetCustomer: customer,
                                openCustomerForm: true,
                                view: true
                              });
                            }}
                            className="icon"
                            src="/images/details-icon.png"
                          />
                          <img
                            data-test={customer._id}
                            style={{ cursor: "pointer" }}
                            onClick={() => this.deleteCustomer(customer._id)}
                            className="icon"
                            src="/images/table-icons/del-icon.png"
                          />
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
          {/* Paggination Code */}
          <center></center>
        </div>
      </section>
    );
  }
}
const mapDispatchtoProps = dispatch => {
  return {
    createCustomer: data => {
      dispatch(customerMiddleWare.createCustomer(data));
    },
    uploadCsutomers: data => {
      dispatch(customerMiddleWare.uploadCsutomers(data));
    },
    delCustomer: customerId => {
      console.log(customerId);
      dispatch(customerMiddleWare.deleteCustomer(customerId));
    }
  };
};
export default connect(store => {
  return {
    data: {
      ...store.customerReducer,
      // ...store.companyReducers,
      ...store.areaReducers
    }
  };
}, mapDispatchtoProps)(Customer);
