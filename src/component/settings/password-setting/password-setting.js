import React from "react";
import { connect } from "react-redux";
// import AutoComplete from "../../autocompletion/autocompletion";

import middleware from "./../../../store/Middleware/store";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
  // KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";

class StoreSettings extends React.Component {
  state = {
    newpasswordadmin: "",
    confirmAdmin:'',
    usernewpassword:'',
    confirmuser:'',
  };
  adminState = evt => {
    this.setState({
      newpasswordadmin: evt.target.value
    });
  };
  adminconfirm=(evt)=>{
 
        this.setState({
          confirmAdmin:evt.target.value

        })
  }
  userState = evt => {
    this.setState({
      usernewpassword: evt.target.value
    });
     console.log(this.state.usernewpassword)
  };
  userconfirm=(evt)=>{
 
    this.setState({
      confirmuser:evt.target.value

    })
    console.log(this.state.confirmuser)
}
  adminUpdate = adminuser => {

    if (this.state.newpasswordadmin==="") {
        Alert.error("Please Enter  Admin Password !", {
          position: "top-right",
          effect: "slide",
          timeout: 3000
        });
      }
    else  if(this.state.newpasswordadmin===this.state.confirmAdmin)
     {
      let  newpasswordadmin=this.state.newpasswordadmin
      fetch("/adminupdate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({newpasswordadmin})
      })
        .then(resp => {
          return resp.json();
        })
        .then(user => {
          console.log(user);
             user?
             Alert.success("Admin password  Updated successfull !", {
              position: "top-right",
              effect: "slide",
              timeout: 3000
            }): Alert.error(" please Enter Admin Password carefully !", {
              position: "top-right",
              effect: "slide",
              timeout: 3000
            });
        });
     
     }
     
        else{

          Alert.error("Admin password  Not Matched !", {
            position: "top-right",
            effect: "slide",
            timeout: 3000
          });
        }


  
  };

  userUpdate = adminuser => {
    if (this.state.usernewpassword==="") {
      Alert.error("Please Enter  user Password !", {
        position: "top-right",
        effect: "slide",
        timeout: 3000
      });
    }
    else if(this.state.usernewpassword===this.state.confirmuser)
    {
     let  usernewpassword=this.state.usernewpassword
     fetch("/userupdate", {
       method: "POST",
       headers: {
         "Content-Type": "application/json"
       },
       body: JSON.stringify({usernewpassword})
     })
       .then(resp => {
         return resp.json();
       })
       .then(user => {
         console.log(user);

         user?
         Alert.success("User Password  Updated Successfull !", {
          position: "top-right",
          effect: "slide",
          timeout: 3000
        }): Alert.error(" Please Enter User Password Carefully !", {
          position: "top-right",
          effect: "slide",
          timeout: 3000
        });
       });
    
    }
    
       else{

        Alert.error("User Password  Not Matched !", {
          position: "top-right",
          effect: "slide",
          timeout: 3000
        });
       }


 
 };

  render() {
    return (
      <div className="app-section">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className="label-head">
            <img src="/images/label-head.png" />
            <h4> password-Settings</h4>
          </div>
          <Alert stack={{ limit: 1 }} />

          <div style={{ marginTop: "55px" }}>
            <div className="row">
              <div class="input-field col s4">
                <input
                  // value={this.state.newpasswordadmin}
                  onChange={this.adminState}
                  placeholder="New Password"
                  // id="newpasswordadmin"
                  type="password"
                  class="validate"
                />
                {/* <label className="default-input" for="supplierPhone">Phone</label> */}
              </div>

              <div class="input-field col s4">
                <input
                  // value={this.state.phone}
                  onChange={this.userState}
                  placeholder="New Password"
                  id="newpassworduser"
                  type="password"
                  class="validate"
                />
                {/* <label className="default-input" for="supplierPhone">Phone</label> */}
              </div>
            </div>

            <div className="row">
              <div class="input-field col s4">
                <input
                  //  value={this.state.confirmpasswordadmin}
                  onChange={this.adminconfirm}
                  placeholder="confirm password"
                  id="confirmpasswordadmin"
                  type="password"
                  class="validate"
                />
                {/* <label className="default-input" for="supplierPhone">Phone</label> */}
              </div>

              <div class="input-field col s4">
                <input
                  // value={this.state.name}
                  onChange={this.userconfirm}
                  placeholder="confirm Password"
                  // id="confirmpassworduser"
                  type="password"
                  class="validate"
                />
                {/* <label className="default-input" for="supplierPhone">Phone</label> */}
              </div>
            </div>

            <div className="row">
              <div class="input-field col s4">
                <button
                  className="waves-effect waves-light btn-small save"
                  onClick={this.adminUpdate}
                >
                  <i class="material-icons"></i>update Admin Password
                </button>
                {/* <textarea
                  // value={this.state.address}
                  onChange={this.updateState}
                  placeholder="Address"
                  id="address"
                  class="white-back materialize-textarea"
                ></textarea> */}
                {/* <label for="supplierAddress">Street Address</label> */}
              </div>

              <button
                className="waves-effect waves-light btn-small save"
                onClick={this.userUpdate}
              >
                <i class="material-icons"></i>update user Password
              </button>
            </div>

            <div className="row">
              <div className="chipsContainer" ref="chipsContainer"></div>
            </div>
          </div>

          {/* </div> */}

          <div className="app-footer">
            {/* <button
              className="waves-effect waves-light btn-small save"
              onClick={this.saveStore}
            >
              <i class="material-icons"></i>Save
            </button> */}
          </div>
        </MuiPickersUtilsProvider>
      </div>
    );
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    adminUpdate: data => {
      dispatch(middleware.toggleadminstate(data));
    }
  };
};

export default connect(store => {
  return {
    data: {
      ...store.storeReducer
    }
  };
}, mapDispatchtoProps)(StoreSettings);
