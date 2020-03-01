/* eslint-disable no-unused-expressions */
import { connect } from "react-redux";
import React, { useState } from "react";
// import "./addCustomer.css";
import customerMiddleWare from "../../store/Middleware/customers";
import utlities from "../../utlities";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import AutoComplete from "../autocompletion/autocompletion";
import Papa from "papaparse";

class AddCustomer extends React.Component {
  constructor() {
    super();
    this.state = {
      area: "",
      company: "",
      supplier: "",
      data: [],
      file: ""
    };
  }

  updateState = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onChangefile = e => {
    console.log(this.state.code);

    let self = this;
    this.setState({ file: e.target.files[0] }, () => {
      console.log(this.state.file);
      Papa.parse(this.state.file, {
        header: true,
        complete: function(results) {
          //   console.log(results);
          results.data.forEach((item, i) => {
            console.log(item);
            
            self.state.area ? (item.area = self.state.area) : null
            self.state.company ? (item.company = self.state.company) : null;
            self.state.supplier ? (item.supplier = self.state.supplier) : null;

            self.state.data.push(item);
          });
        }
      });
    });
    // let item = {
    //   // product
    //   costArray: ["500"],
    //   shopkeeperArray: ["550"],
    //   customerArray: ["600"],
    //   company: "5e202488cf180016ec2496da",
    //   category: "5e2024b2cf180016ec2496dc",
    //   supplier:"5e20249fcf180016ec2496db",
    //   name: "AbdulRehman",
    //   cost: 500,
    //   shopkeeperPrice: 550,
    //   margin: -50,
    //   customerPrice: 600,
    //   quantityType: "unit",
    //   productQty: 1,
    //   cartonSize: 6,
    //   description: "gggg",

    //   status: false

    //supplier
    //   firstName: "mani",
    //   lastName: "gfdg",
    //   phone: "03133205197",
    //   email: "ar03015511197@gmail.com",
    //   zip: "38000",
    //   supplierProvince: "Punjab",
    //   supplierGender: "Male",
    //   address: "gf",
    //   agency: "gfgf",
    //   comments: "gf"
    // };
    // self.state.data.push(item);
  };
  getdata = ()=>{
    if(this.props.title == 'Customer'){
   this.state.area ? this.props.getData(this.state.data) : Alert.error("Please  Fill Given Field !", {
        position: "top-right",
        effect: "slide",
        timeout: 4000
      });
    }
    if(this.props.title == 'Suppliers'){
      this.state.company  ? this.props.getData(this.state.data) : Alert.error("Please  Fill Given Field!", {
        position: "top-right",
        effect: "slide",
        timeout: 4000
      });
    }
    if(this.props.title == 'Product'){
      this.state.supplier ? this.props.getData(this.state.data) : Alert.error("Please  Fill Given Field !", {
        position: "top-right",
        effect: "slide",
        timeout: 4000
      });
    }
     
  }
  render() {
    return (
      <div className="add-customer">
        <div
          class="modal-overlay"
          style={{ "z-index": 1002, display: "block", opacity: 0.5 }}
        ></div>
        <div
          id="modal1"
          class="modal full-max-height"
          style={{ display: "block" }}
        >
          <div class="modal-content">
            <div className="sub-head">Add {this.props.title}</div>
            <Alert stack={{ limit: 1 }} />

            <div className="modal-body">
              <div class="row">
                {this.props.area ? (
                  <div class="col 4">
                    <AutoComplete
                      property="name"
                      onChange={(evt, area) => {
                        console.log("sals chane", area);
                        area &&
                          this.updateState({
                            target: {
                              id: "area",
                              value: area._id
                            }
                          });
                          
                          
                      }}
                      data={this.props.area}
                      placeholder="Select Area"
                    />
                  </div>
                ) : null}
                {this.props.company ? (
                  <div class="col 4">
                    <AutoComplete
                      property="name"
                      onChange={(evt, company) => {
                        console.log("sals chane", company);
                        company &&
                          this.updateState({
                            target: {
                              id: "company",
                              value: company._id
                            }
                          });
                      }}
                      data={this.props.company}
                      placeholder="Select Company"
                    />
                  </div>
                ) : null}
                {this.props.suppliers ? (
                  <div class="col 4">
                    <AutoComplete
                      property="firstName"
                      onChange={(evt, supplier) => {
                        console.log("sals chane", supplier);
                        supplier &&
                          this.updateState({
                            target: {
                              id: "supplier",
                              value: supplier._id
                            }
                          });
                      }}
                      data={this.props.suppliers}
                      placeholder="Select Supplier"
                    />
                  </div>
                ) : null}
                <div class="col 4">
                  <img
                    className="icon add-item"
                    style={{ position: "relative" }}
                    src="/images/table-icons/upload-icon.png"
                    onClick={() => this.setState({ openUploadModel: true })}
                  />
                  <input
                    className="icon add-item"
                    type="file"
                    accept=".csv"
                    style={{
                      right: "50%",
                      position: "relative",
                      width: 35,
                      borderRadius: "50%",
                      opacity: 0
                    }}
                    onChange={this.onChangefile}
                  />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                className="waves-effect waves-light btn-small save"
                onClick={this.getdata}
              >
                <i class="material-icons"></i>Save
              </button>
              <button
                className="waves-effect waves-light btn-small cancel"
                onClick={() => {
                  //props.toggleMenu(false)
                  this.props.showAddCustomer(false);
                }}
              >
                <i class="material-icons"></i>Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddCustomer;
