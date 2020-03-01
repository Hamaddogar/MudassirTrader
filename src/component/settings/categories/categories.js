import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddCategory from "./addCategory";
import middleware from "../../../store/Middleware/category";
import category from "../../../store/Middleware/category";
import Pagination from "react-js-pagination";
import Papa from "papaparse";
import utlities from "../../../utlities";
import "./catigories.css";
// const Category = (this.props) => {
class Category extends React.Component {
  // let [addingCategory, showAddCategory] = useState(false);
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemPerPage: 10,
      targetCategory: {
        name: ""
      },
      openCategoryForm: false,
      file: ""
    };
  }

  // toggleStatus = (company) => {

  //     company.status = !company.status;
  //     this.props.toggleState(company);

  // }
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }
  pageNumberHandlerCatigories=(e)=>{
     let pageNumbercatigores= e.target.value;
      this.setState({
        itemPerPage:pageNumbercatigores

      })


  }
  deleteArea = id => {
    let isDelete = window.confirm("Confirm Delete Category");
    if (isDelete) {
      return this.props.deleteArea(id);
    }
  };
  searchCatigories = e => {
    let selectcatigores = e.target.value;
    this.setState({
      selectcatigores: selectcatigores
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
            return element.name != "";
          });

          filterDAta.forEach(item => {
            let newIndex = utlities.getID(
              "C",
              "code",
              self.props.data.categories
            );
            item.code = "C" + (+newIndex.slice(1) + index);
            index += 1;
          });
          self.props.uploadCategory(filterDAta);
        }
      });
    });
  };
  saveData = (function() {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function(data, fileName) {
      data.forEach(product => {
        delete product._id;
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
  render = () => {
    let indexOfLastitem = this.state.activePage * this.state.itemPerPage;
    let indexOfFirstitem = indexOfLastitem - this.state.itemPerPage;
    let renderedCategories = this.props.data.categories.slice(
      indexOfFirstitem,
      indexOfLastitem
    );

    const catigories_Filter = renderedCategories.filter((item, index) => {
      return item.name.toLowerCase().includes( this.state.selectcatigores?this.state.selectcatigores.toLowerCase():'');
    });
    return (
      <section className="app-section">
        {this.state.openCategoryForm ? (
          <AddCategory
            category={this.state.targetCategory}
            showAddCategory={() => {
              this.setState({
                openCategoryForm: false,
                targetCategory: {
                  name: ""
                }
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
            Categories
            <span id="cati-total"> {this.props.data.categories.length}</span>
          </h4>
          {this.props.data.categories.length != 0 ? (
          <div className="pagination-input-style-catigories">
       
            <div id="pagination-setting">
              <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={renderedCategories.length}
                totalItemsCount={this.props.data.categories.length}
                pageRangeDisplayed={renderedCategories.length}
                onChange={pageNumber => this.handlePageChange(pageNumber)}
              />
            </div>
           <div id="page-setting-catigories">
              <select
                id="dropdown-style-catigories"
                onChange={e => {
                  this.pageNumberHandlerCatigories(e);
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
            <div className="selectSetting">
              <input
                className="selectstyle"
                onChange={e => {
                  this.searchCatigories(e);
                }}
                placeholder="Search Catigories"
              />
            </div>
          </div>
        </div>

        <div>
          <table>
            <thead id="thead-catigories">
              <tr>
                <th>SR.</th>
                <th>CODE</th>
                <th>NAME</th>

                <th>
                  <img
                    className="icon add-item"
                    style={{ right: "8%" }}
                    src="/images/table-icons/download.png"
                    onClick={() =>
                      this.props.data.categories.length
                        ? this.saveData(
                            this.props.data.categories,
                            "Categories.csv"
                          )
                        : alert("Please Enter Categorie")
                    }
                  />
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
                      // showAddCategory(true)
                      this.setState({
                        openCategoryForm: true
                      });
                    }}
                    className="icon add-item"
                    src="/images/add-icon.png"
                  />
                </th>
              </tr>
            </thead>
            <tbody className={(renderedCategories ||catigories_Filter).length>6?"bodystyle-catigories":''}>
              {catigories_Filter.length != 0
                ? catigories_Filter.map((category, i) => {
                    return (
                      <tr id="tbody-catigories">
                        <td>
                          <b>{i + 1}</b>
                        </td>
                        <td>{category.code}</td>
                        <td>{category.name}</td>
                        <td>
                          <img
                            title="Edit"
                            onClick={() => {
                              this.setState({
                                targetCategory: category,
                                openCategoryForm: true
                              });
                            }}
                            className="icon pointer"
                            src="/images/table-icons/edit-icon.png"
                          />
                          <img
                            title="Delete"
                            onClick={() => this.deleteArea(category._id)}
                            className="icon pointer"
                            src="/images/table-icons/del-icon.png"
                          />
                        </td>
                        {/* <td>
                    <Link to={'/accountsdetails/'+supplier.id}>
                            <img className="icon" src="/images/details-icon.png" />
                    </Link>
                     </td> */}
                      </tr>
                    );
                  })
                : renderedCategories.map((category, i) => {
                    return (
                      <tr id="tbody-catigories">
                        <td>
                          <b>{i + 1}</b>
                        </td>
                        <td>{category.code}</td>
                        <td>{category.name}</td>
                        <td>
                          <img
                            title="Edit"
                            onClick={() => {
                              this.setState({
                                targetCategory: category,
                                openCategoryForm: true
                              });
                            }}
                            className="icon pointer"
                            src="/images/table-icons/edit-icon.png"
                          />
                          <img
                            title="Delete"
                            onClick={() => this.deleteArea(category._id)}
                            className="icon pointer"
                            src="/images/table-icons/del-icon.png"
                          />
                        </td>
                        {/* <td>
                    <Link to={'/accountsdetails/'+supplier.id}>
                            <img className="icon" src="/images/details-icon.png" />
                    </Link>
                     </td> */}
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

export default connect(
  store => {
    return {
      data: store.categoryReducers
    };
  },
  dispatch => {
    return {
      uploadCategory: args => {
        dispatch(middleware.uploadCategory(args));
      },
      toggleState: args => {
        dispatch(middleware.toggleCompanyState(args));
      },
      deleteArea: areaId => {
        dispatch(middleware.deleteCategory(areaId));
      }
    };
  }
)(Category);
