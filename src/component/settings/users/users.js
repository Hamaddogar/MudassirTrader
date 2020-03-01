import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddUser from "./addUser";
import Pagination from "react-js-pagination";
import middleware from "../../../store/Middleware/users";
import "./users.css";
import Papa from "papaparse";
import utlities from "../../../utlities";
import UploadModel from "../../upload/uploadModel";
import { ThemeProvider } from "@material-ui/core/styles";

// const User = (this.props) => {
class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      targetUser: { areas: [] },
      activePage: 1,
      itemPerPage: 10,
      file: "",
      openUploadModel: false
    };
  }

  state = {
    // targetUser: { areas: [] },
    openUserForm: false
  };

  // let [addingUser, showAddUser] = useState(false);
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }
  pageNumberHandleruser=(e)=>{
   this.setState({

    itemPerPage:e.target.value
   })

  }
  deleteUser = user => {
    let result = window.confirm("confirm delete user");
    if (result) {
      this.props.deleteUser(user);
    }
  };
  toggleStatus = user => {
    user.status = !user.status;
    this.props.toggleState(user);
  };
  selectuser = e => {
    let selectuser = e.target.value;
    this.setState({
      selectuser: selectuser
    });
  };
  onChangefile = e => {
    console.log(this.state.code);

    let self = this;
    this.setState({ file: e.target.files[0] }, () => {
      console.log(this.state.file);
      Papa.parse(this.state.file, {
        header: true,
        complete: function(results) {
          console.log(results);
          let newArray = [...results.data];

          debugger;

          let index = 0;

          let filterDAta = newArray.filter((element, index) => {
            return element.fullName != undefined || element.fullName != "";
          });

          filterDAta.forEach(item => {
            let newIndex = utlities.getID("U", "code", self.props.data.users);
            item.code = "U" + (+newIndex.slice(1) + index);
            index += 1;
            item.areas = [item.areas];
          });
          debugger;
          self.props.uploadUser(filterDAta);
        }
      });
    });
  };
  getData = data => {
    console.log(data);
    let self = this;
    let newArray = [...data];

    debugger;

    let index = 0;

    let filterDAta = newArray.filter((element, index) => {
      return element.fullName != undefined && element.fullName != "";
    });

    filterDAta.forEach(item => {
      let newIndex = utlities.getID("C", "code", self.props.data.customers);
      item.code = "C" + (+newIndex.slice(1) + index);
      index += 1;
    });
    self.props.uploadCsutomers(filterDAta);
    self.setState({ openUploadModel: false });
  };
  render = () => {
    let indexOfLastitem = this.state.activePage * this.state.itemPerPage;
    let indexOfFirstitem = indexOfLastitem - this.state.itemPerPage;
    let users = this.props.data.users.filter(user => {
      return user != null;
    });
    let rendereduser = users.slice(indexOfFirstitem, indexOfLastitem);
    // let uIndex = this.props.data.users.indexOf(this.state.targetUser);

    // uIndex == -1 &&
    //   (this.state.targetUser = this.props.data.users.find(user => {
    //     return user._id == this.state.targetUser._id;
    //   }) || {
    //     areas: []
    //   });

    const user_Filter = rendereduser.filter((item, index) => {
      return item.fullName
        ? item.fullName
            .toLowerCase()
            .includes(
              this.state.selectuser ? this.state.selectuser.toLowerCase() : null
            )
        : null;
    });
    return (
      <section className="app-section">
        {this.state.openUploadModel && (
          <UploadModel
            title={"User"}
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
        {this.state.openUserForm ? (
          <AddUser
            user={this.state.targetUser}
            showAddUser={() => {
              this.setState({
                openUserForm: false
              });
            }}
          />
        ) : null}
        <div className="label-head">
          <img src="/images/label-head.png" />
          <h4>Users <span className="user-total">{this.props.data.users.length}</span></h4>

          {this.props.data.users.length != 0 ? (
          <div className="pagination-input-style-user">
            <div id="pagginationUser">
              <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={rendereduser.length}
                totalItemsCount={this.props.data.users.length}
                pageRangeDisplayed={rendereduser.length}
                onChange={pageNumber => this.handlePageChange(pageNumber)}
              />
            </div>
         

          <div id="page-setting-user">
            <select
              id="dropdown-style-user"
              onChange={e => {
                this.pageNumberHandleruser(e);
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
        <div className="row">
          <div className="selectSetting">
            <div class="input-field col s3">
              <input
                className="selectstyle"
                onChange={e => {
                  this.selectuser(e);
                }}
                placeholder="Search User"
              />
            </div>
          </div>
        </div>

        <div>
          <table>
            <thead id="thead-user">
              <tr>
                <th>SR.</th>
                <th>EMPLOYEE CODE</th>
                <th>FULL NAME</th>
                <th>EMAIL</th>
                <th>CONTACT</th>
                <th>ADDRESS</th>
                <th>DATE</th>
                <th>
                  <img
                    className="icon add-item"
                    style={{ right: "4%" }}
                    src="/images/table-icons/upload-icon.png"
                  />
                  <input
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
                  />
                  <img
                    onClick={() => {
                      this.setState({
                        targetUser: {
                          areas: []
                        },
                        openUserForm: true
                      });
                    }}
                    className="icon add-item"
                    src="/images/add-icon.png"
                  />
                </th>
              </tr>
            </thead>
            <tbody  className={(rendereduser  || user_Filter).length>6?"bodystyle-user":''}>
              {user_Filter.length != 0
                ? user_Filter.map((user, i) => {
                    return (
                      <tr id="thead-user">
                        <td>
                          <b>{i + 1}</b>
                        </td>
                        <td>{user.code}</td>
                        <td className="wd-200">{user.fullName}</td>
                        <td style={{ width: "160px" }}>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>
                          {user.areas.length > 0
                            ? user.areas
                                .map(area => {
                                  return area != undefined || null
                                    ? area.name
                                    : "";
                                })
                                .join(",")
                            : ""}
                        </td>
                        <td>{user.date}</td>
                        <td style={{ width: "130px" }}>
                          {!user.admin ? (
                            <div>
                              <button
                                onClick={() => this.toggleStatus(user)}
                                className={
                                  user.status
                                    ? "control-btn"
                                    : "control-btn disabled-btn"
                                }
                              >
                                {user.status ? "Activate" : "Deactivate"}
                              </button>
                              <img
                                title="Edit"
                                onClick={() => {
                                  this.setState({
                                    targetUser: user,
                                    openUserForm: true
                                  });
                                }}
                                className="icon pointer"
                                src="/images/table-icons/edit-icon.png"
                              />

                              <img
                                className="icon"
                                onClick={() => {
                                  this.deleteUser(user._id);
                                }}
                                src="/images/table-icons/del-icon.png"
                              />
                            </div>
                          ) : (
                            ""
                          )}
                        </td>
                      </tr>
                    );
                  })
                : rendereduser.map((user, i) => {
                    return (
                      <tr id="thead-user">
                        <td>
                          <b>{i + 1}</b>
                        </td>
                        <td>{user.code}</td>
                        <td className="wd-200">{user.fullName}</td>
                        <td style={{ width: "160px" }}>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>
                          {user.areas
                            .map(area => {
                              return area.name;
                            })
                            .join(",")}
                        </td>
                        <td>{user.date}</td>
                        <td style={{ width: "200px" }}>
                          <button
                            onClick={() => this.toggleStatus(user)}
                            className={
                              user.status
                                ? "control-btn"
                                : "control-btn disabled-btn"
                            }
                          >
                            {user.status ? "Activate" : "Deactivate"}
                          </button>
                          <img
                            title="Edit"
                            onClick={() => {
                              this.setState({
                                targetUser: user,
                                openUserForm: true
                              });
                            }}
                            className="icon pointer"
                            src="/images/table-icons/edit-icon.png"
                          />

                          <img
                            className="icon"
                            onClick={() => {
                              this.deleteUser(user._id);
                            }}
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
  };
}
const mapDispatchtoProps = dispatch => {
  return {
    deleteUser: data => {
      dispatch(middleware.deleteUser(data));
    },
    toggleState: data => {
      dispatch(middleware.toggleUserState(data));
    },
    uploadUser: data => {
      dispatch(middleware.uploadUser(data));
    }
  };
};
export default connect(store => {
  return {
    data: store.userReducer
  };
}, mapDispatchtoProps)(User);
