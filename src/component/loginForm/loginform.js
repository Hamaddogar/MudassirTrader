import React from "react";
import "./logincss.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import {middlewaresignup} from './../../store/Middleware/middleware'
import * as middleware from "../../store/Middleware/middleware";
import { login } from "../../store/Action/actionCreater";
import Header from "../navbar/navbar";
import Dashboard from "../dasboard/dashboard";
import utlities from "../../utlities";

class Login extends React.Component {
  state = {
    // username:'',
    email: "",
    // number:'',
    password: "",
    admin:true
  };
  handleValue = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
    // console.log(evt.target.value);
  };
  signupUser = evt => {
    // this.setState({ code: utlities.getID("U", "code", this.props.data.users) });
    evt.preventDefault();
    this.props.updatedSignup(this.state);
  };

  render() {
    let tokenget = localStorage.getItem("token");
    //   // console.log(this.props.loggedInUser);

    //   if (tokennew) {
    //     this.props.history.push("/dashboard");
    //   }

    return (
      <div>
        {!tokenget ? (
          <div className="formstyle">
            {/* <Link to='/'> */}
            <div className="loginForm">Login</div>
            {/* </Link> */}
            <form onSubmit={this.signupUser}>
              <input
                type="email"
                name="email"
                onChange={this.handleValue}
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                onChange={this.handleValue}
                placeholder="password"
              />
              <div>
                <button className="def-btn" onClick={this.loginUser}>
                  Login
                </button>
              </div>
            </form>
          </div>
        ) : null}
      </div>
    );
  }
}
const mapDispatchtoProps = dispatch => {
  return {
    updatedSignup: data => {
      dispatch(middleware.middlewaresignup(data));
    }
  };
};
export default connect(store => {
  return {
    ...store.loginReducers,
  
  };
}, mapDispatchtoProps)(Login);
