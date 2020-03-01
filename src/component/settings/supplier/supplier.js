import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddSupplier from "./addSupplier";
import Pagination from "react-js-pagination";
import supplierMiddleWare from "../../../store/Middleware/suppliers";
import Papa from "papaparse";
import UploadModel from "../../upload/uploadModel";
// const supplier = (props)=>{
import utlities from "../../../utlities";
import "./suppliers.css";
class Supplier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemPerPage: 10,
      opensupplierForm: false,
      file: "",
      openUploadModel: false
    };
  }

  // onChangefile = e => {
  //   let self = this;
  //   this.setState({ file: e.target.files[0] }, () => {
  //     console.log(this.state.file);
  //     Papa.parse(this.state.file, {
  //       header: true,
  //       complete: function(results) {
  //         //   console.log(results);
  //         results.data.forEach((item, i) => {
  //           //   if(item._id != ''){
  //           console.log(item);
  //           item.code = "CUST_" + i;
  //           self.props.createsupplier(item);
  //           //   }
  //           //    setTimeout(()=>{

  //           //    })
  //         });
  //       }
  //     });
  //   });
  // };

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }
  pageNumberHandlerSupplier=(e)=>{
 this.setState({
     itemPerPage:e.target.value

 })

  }
  deleteSupplier = supplierId => {

    let isDelete = window.confirm("Confirm Delete Supplier");
    if (isDelete) {
      return  this.props.delsupplier(supplierId);
    }
   
  };
  toggleStatus = supplier => {
    debugger;
    supplier.status = !supplier.status;
    console.log(supplier.status);
    this.props.createsupplier(supplier);
  };
  getData = data => {
    console.log(data);
    let self = this;
    let newArray = [...data];

    debugger;

    let index = 0;

    let filterDAta = newArray.filter((element, index) => {
      return element.firstName != "";
    });

    filterDAta.forEach(item => {
      let newIndex = utlities.getID("S", "code", self.props.data.suppliers);
      item.code = "S" + (+newIndex.slice(1) + index);
      index += 1;
      
    });
    self.props.uploadSupplier(filterDAta);

    // alert("Plaese Insert Require Data!");
    // }, 1000);

    self.setState({ openUploadModel: false });
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
        product.company = product.company.name;
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
    let renderedsuppliers = this.props.data.suppliers.length
      ? this.props.data.suppliers.slice(indexOfFirstitem, indexOfLastitem)
      : [];
    console.log(renderedsuppliers);
    return (
      <section className="app-section">
        {this.state.openUploadModel && (
          <UploadModel
            title="Suppliers"
            getData={this.getData}
            company={this.props.data.companies}
            // company = {this.props.data.companies}
            showAddCustomer={flag => {
              this.setState({
                openUploadModel: false
              });
            }}
          />
        )}
        {this.state.opensupplierForm && (
          <AddSupplier
            view={this.state.view}
            supplier={this.state.targetsupplier}
            showAddSupplier={flag => {
              this.setState({
                opensupplierForm: false
              });
            }}
          />
        )}
        <div className="label-head">
          <img src="/images/label-head.png" />

          <h4
            style={{
              marginLeft: "-25%"
            }}
          >
            Suppliers< span className="supplier-total">{this.props.data.suppliers.length}</span>
          </h4>
          {this.props.data.suppliers.length != 0 ? (
          <div className="pagination-input-style-supplier">
         
            <div id="paggination-Setting">
              <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={renderedsuppliers.length}
                totalItemsCount={this.props.data.suppliers.length}
                pageRangeDisplayed={renderedsuppliers.length}
                onChange={pageNumber => this.handlePageChange(pageNumber)}
              />
            </div>
         
          <div id="page-setting-supplier">
              <select
                id="dropdown-style-supplier"
                onChange={e => {
                  this.pageNumberHandlerSupplier(e);
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
            <input
              // placeholder="Placeholder"
              id="first_name"
              type="text"
              class="validate"
              style={{ opacity: 0 }}
            />
            {/* <label className="adjusted-label" for="first_name">
              Search suppliers
            </label> */}
          </div>
        </div>

        <div>
          <table>
            <thead id="thead-supplier">
              <tr>
                <th>SR.</th>
                <th>CODE</th>
                <th>NAME</th>
                <th>COMPANY</th>
                <th>PHONE</th>
                <th>ADDRESS</th>
                <th>
                  <img
                    className="icon add-item"
                    style={{ right: "8%" }}
                    src="/images/table-icons/download.png"
                    onClick={() =>
                      this.props.data.suppliers.length
                        ? this.saveData(
                            this.props.data.suppliers,
                            "Suppliers.csv"
                          )
                        : alert("Plaeae Enter Supplier")
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
                      right: "4%",
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
                          targetsupplier: {
                            company: {},
                            area: {}
                          },
                          opensupplierForm: true
                        });
                      }}
                      className="icon add-item"
                      src="/images/add-icon.png"
                    />
                  )}
                </th>
              </tr>
            </thead>
            <tbody  className={renderedsuppliers.length>6?"bodystyle-supplier":''}>
              {renderedsuppliers
                ? renderedsuppliers.map((supplier, i) => {
                    return (
                      <tr id="thead-supplier">
                        <td>
                          <b>{i + 1}</b>
                        </td>
                        <td>{supplier.code}</td>
                        {/* <td>{supplier.area.name}</td> */}
                        <td>{supplier.firstName?supplier.firstName:''}</td>
                        <td>
                          {supplier.company.name ? supplier.company.name : ""}
                        </td>
                        <td>{supplier.phone}</td>
                        <td>{supplier.address}</td>
                        <td style={{ width: "200px" }}>
                          <button
                            onClick={() => this.toggleStatus(supplier)}
                            className={
                              supplier.status
                                ? "control-btn"
                                : "control-btn disabled-btn"
                            }
                          >
                            {supplier.status ? "Activate" : "Deactivate"}
                          </button>
                          <img
                            title="Edit"
                            onClick={() => {
                              this.setState({
                                targetsupplier: supplier,
                                opensupplierForm: true,
                                view: false
                              });
                            }}
                            className="icon pointer"
                            src="/images/table-icons/edit-icon.png"
                          />

                          <img
                            onClick={() => {
                              this.setState({
                                targetsupplier: supplier,
                                opensupplierForm: true,
                                view: true
                              });
                            }}
                            className="icon"
                            src="/images/details-icon.png"
                          />
                          <img
                            onClick={() => this.deleteSupplier(supplier._id)}
                            className="icon"
                            src="/images/table-icons/del-icon.png"
                          />
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}
const mapDispatchtoProps = dispatch => {
  return {
    createsupplier: data => {
      dispatch(supplierMiddleWare.createSupplier(data));
    },
    uploadSupplier: data => {
      dispatch(supplierMiddleWare.uploadSupplier(data));
    },
    delsupplier: supplierId => {
      dispatch(supplierMiddleWare.deleteSupplier(supplierId));
    }
  };
};
export default connect(store => {
  return {
    data: { ...store.supplierReducer, ...store.companyReducers }
  };
}, mapDispatchtoProps)(Supplier);
