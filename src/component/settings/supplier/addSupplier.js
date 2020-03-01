import { connect } from "react-redux";
import React, { useState } from "react";
import middleWare from "../../../store/Middleware/suppliers";
// import "./addSupplier.css";
import utlities from "../../../utlities";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";

const AddSupplier = props => {
  let [state, setState] = useState({
    code: utlities.getID("SUPPL", "code", props.data.suppliers),
    ...props.supplier
  });
  //   let [errormessage,seterrormessage]=useState({})
  function updateState(evt) {
    state[evt.target.id] = evt.target.value;
    setState({ ...state });
    console.log(state)
  }

  function saveSupplier() {
    state.code = state._id ? state.code : props.data.supplierCode;
    let pattern = /^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(\-[a-z0-9]+)*(\.[a-z0-9]+(\-[a-z0-9]+)*)*\.[a-z]{2,4}$/;

    // Validation check
    if (state.firstName === undefined || state.firstName === "") {
      Alert.error("Please Enter Supplier Name !", {
        position: "top-right",
        effect: "slide",
        timeout: 3000
      });
    // } else if (state.lastName === undefined || state.lastName === "") {
    //   Alert.error("Please Enter Supplier Last  Name!", {
    //     position: "top-right",
    //     effect: "slide",
    //     timeout: 3000
    // //   });
    // } else if (state.email === undefined || state.email === "") {
    //   Alert.error("Please Enter Supplier  Email Carefully!", {
    //     position: "top-right",
    //     effect: "slide",
    //     timeout: 3000
    //   });
    // } else if (pattern.test(state.email) === false) {
    //   Alert.error("Please Enter  Supplier Email Carefully!", {
    //     position: "top-right",
    //     effect: "slide",
    //     timeout: 3000
    //   });
    // } else if (state.gender === undefined || state.gender === "Gender") {
    //   Alert.error("Please Select Supplier  Gender!", {
    //     position: "top-right",
    //     effect: "slide",
    //     timeout: 3000
    //   });
    // } else if (state.zip === undefined || state.zip === "") {
    //   Alert.error("Please Enter Supplier  Zip Code!", {
    //     position: "top-right",
    //     effect: "slide",
    //     timeout: 3000
    //   });
    // } else if (state.province === undefined || state.province === "Province") {
    //   Alert.error("Please select  Supplier Province!", {
    //     position: "top-right",
    //     effect: "slide",
    //     timeout: 3000
    //   });
    // } else if (state.address === undefined || state.address === "") {
    //   Alert.error("Please Enter Supplier Address!", {
    //     position: "top-right",
    //     effect: "slide",
    //     timeout: 3000
    //   });
    // } else if (state.agency === undefined || state.agency === "") {
    //   Alert.error("Please Enter  Supplier   Agency Name!", {
    //     position: "top-right",
    //     effect: "slide",
    //     timeout: 3000
    //   });
    } else if (state.phone === undefined || state.phone === "") {
      Alert.error("Please Enter Supplier Phone Number!", {
        position: "top-right",
        effect: "slide",
        timeout: 3000
      });
    } else if (
      Object.keys(state.company).length === 0 ||
      state.company === "Select Company"
    ) {
      Alert.error("Please  select  Supplier Company!", {
        position: "top-right",
        effect: "slide",
        timeout: 3000
      });
    } else {
      console.log(state);
      delete state.area
      delete state.companies
      // state.company = state.company._id
      props.createSupplier(state);
      setTimeout(()=>{
        
       
        props.showAddSupplier(false);

      },500)
        setState({
          phone: "",
          firstName: "",
          // lastName: "",
          email: "",
          gender: "",
          zip: "",
          province: "",
          address: "",
          agency: "",
          comments: "",
          company:{name:''},
         

        });
     
    }
  }

  return (
    <div className="add-supplier">
      <div
        class="modal-overlay"
        style={{ "z-index": 1002, display: "block", opacity: 0.9 }}
      ></div>
      <div
        id="modal1"
        class="modal full-max-height"
        style={{ display: "block" }}
      >
        <div class="modal-content" className={props.view ? "pointerview" : ""}>
          <div className="sub-head">Add Supplier</div>

          <div className="modal-body">
            <Alert stack={{ limit: 1 }} />
            <input
              className="readonly-code"
              placeholder="Supplier Code"
              value={state._id ? state.code : props.data.supplierCode}
              readOnly
              id="code"
              type="text"
              required
            />

            <div className="row">
              {/* TBC, render companies name here */}
              <div class="input-field col s6">
                <select
                  value={state.company._id}
                  onChange={updateState}
                  id="company"
                  className="inline"
                  required
                >
                  {[{ name: "Select Company" }]
                   .concat(props.data.companies)
                    .map(company => {
                      return (
                        <option 
                        selected={
                          state.company.name == company.name ? "selected" : ""
                        }
                        value={company._id}>{company.name}</option>
                      );
                    })}
                </select>
                {/* <input placeholder="Placeholder" id="companyName" type="text" class="validate" />
                        <label className="default-input" for="companyName">Company Name</label> */}
              </div>

              <div class="input-field col s6">
                <input
                  value={state.phone}
                  onChange={updateState}
                  placeholder="Phone"
                  id="phone"
                  type="text"
                  class="validate"
                
                />
                {/* <label className="default-input" for="supplierPhone">Phone</label> */}
              </div>
            </div>

            <div className="row">
              <div class="input-field col s6">
                <input
                  value={state.firstName}
                  onChange={updateState}
                  placeholder=" Name"
                  id="firstName"
                  type="text"
                  class="validate"
                  required
                />
                {/* <label className="default-input" for="supplierfName">First Name</label> */}
              </div>
              <div class="input-field col s6">
                {/* <input
                  value={state.lastName}
                  onChange={updateState}
                  placeholder="Last Name"
                  id="lastName"
                  type="text"
                  class="validate"
                  required
                /> */}
                {/* <label className="default-input" for="supplierlName">Last Name</label> */}
              </div>
            </div>

            <div className="row">
              <div class="input-field col s6">
                <input
                  value={state.email}
                  onChange={updateState}
                  placeholder="Email"
                  id="email"
                  type="email"
                  class="validate"
                  required
                />
                {/* <label className="default-input" for="supplierEmail">Email</label> */}
              </div>

              <div class="input-field col s6">
                <select
                  value={state.gender}
                  onChange={updateState}
                  className="inline"
                  id="gender"
                  required
                >
                  <option>Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div class="input-field col s6">
                <input
                  value={state.zip}
                  onChange={updateState}
                  placeholder="Zip"
                  id="zip"
                  type="number"
                  class="validate"
                  required
                />
                {/* <label className="default-input" for="supplierZip">Zip</label> */}
              </div>

              <div class="input-field col s6">
                <select
                  value={state.province}
                  onChange={updateState}
                  className="inline"
                  id="province"
                  required
                >
                  <option>Province</option>
                  <option>Punjab</option>
                  <option>Sindh</option>
                  <option>Balochistan</option>
                  <option>KPK</option>
                  <option>Gilgit Baltistan</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div class="input-field col s6">
                <textarea
                  value={state.address}
                  onChange={updateState}
                  placeholder="Adress"
                  id="address"
                  class="materialize-textarea"
                  required
                ></textarea>
                {/* <label for="supplierAddress">Street Address</label> */}
              </div>

              <div class="input-field col s6">
                <input
                  value={state.agency}
                  onChange={updateState}
                  placeholder="Agency Name"
                  id="agency"
                  type="text"
                  class="validate"
                  required
                />
                {/* <label className="default-input" for="supplierAgency">Agency Name</label> */}
              </div>
            </div>

            <div className="row">
              <div class="input-field col s6">
                <textarea
                  value={state.comments}
                  onChange={updateState}
                  placeholder="Comments"
                  id="comments"
                  class="materialize-textarea"
                  required
                ></textarea>
                {/* <label for="supplierComments">Comments</label> */}
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          {!props.view ? (
            <button
              className="waves-effect waves-light btn-small save"
              onClick={saveSupplier}
            >
              <i class="material-icons"></i>Save
            </button>
          ) : (
            ""
          )}
          <button
            className="waves-effect waves-light btn-small cancel"
            onClick={() => {
              //props.toggleMenu(false)
              props.showAddSupplier(false);
            }}
          >
            <i class="material-icons"></i>Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default connect(
  store => {
    return {
      data: { ...store.supplierReducer, ...store.companyReducers }
    };
  },
  dispatch => {
    return {
      createSupplier(data) {
        return dispatch(middleWare.createSupplier(data));
      }
    };
  }
)(AddSupplier);
