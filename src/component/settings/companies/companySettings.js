import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddCompany from "./addCompany";
import middleware from "../../../store/Middleware/company";
import Pagination from "react-js-pagination";
import "./company.css";
import Papa from "papaparse";
import utlities from "../../../utlities";
// const Company = (this.props) => {
class Company extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      targetCompany: {},
      openCompanyForm: false,
      activePage: 1,
      itemPerPage: 10,
      selectcompany: "",
      file: ""
    };
  }
  // let [addingCompany, showAddCompany] = useState(false);
  deleteArea = id => {
    let filterProduct = this.props.data.products.filter((product)=>{
      return product.company._id == id
    })
    if(filterProduct.length > 0){
    let isDelete = window.confirm(`Confirm Delete Compnay ${filterProduct.length} products attached`);
    if (isDelete) {
      return this.props.deleteArea(id);
    }
    }else{
    this.props.deleteArea(id)
    }
  };
  toggleStatus = company => {
    company.status = !company.status;
    this.props.toggleState(company);
  };
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }
  pageNumberHandlerCampany=(e)=>{
   let pageNumberget = e.target.value;
    this.setState({
    itemPerPage:pageNumberget

    })

  }
  selectcompany = e => {
    let selectcompany = e.target.value;
    this.setState({
      selectcompany: selectcompany
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
            return element.name != "" 
          });

          filterDAta.forEach(item => {
            let newIndex = utlities.getID(
              "C",
              "code",
              self.props.data.companies
            );
            item.code = "C" + (+newIndex.slice(1) + index);
            index += 1;
          });
          self.props.uploadCompany(filterDAta);
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
        delete product._id
        
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
    let rendercompanies = this.props.data.companies.slice(
      indexOfFirstitem,
      indexOfLastitem
    );

    const company_Filter = rendercompanies.filter((item, index) => {
      return  item .name ?item.name.toLowerCase().includes(this.state.selectcompany?this.state.selectcompany.toLowerCase():''):''
    });
    console.log("company Components", this.props.data.companies);

    return (
      <section className="app-section">
        {this.state.openCompanyForm ? (
          <AddCompany
            company={this.state.targetCompany}
            showAddCompany={() => {
              this.setState({
                targetCompany: {},
                openCompanyForm: false
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
            Companies
          <span className="company-total">{this.props.data.companies.length}</span>
          </h4>
          {this.props.data.companies.length != 0 ? (
          <div className="pagination-input-style-company">

         
            <div className="pagination-setting">
              <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={rendercompanies.length}
                totalItemsCount={this.props.data.companies.length}
                pageRangeDisplayed={rendercompanies.length}
                onChange={pageNumber => this.handlePageChange(pageNumber)}
              />
            </div>
       
           <div id="page-setting-company">
              <select
                id="dropdown-style-comapany"
                onChange={e => {
                  this.pageNumberHandlerCampany(e);
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
                  this.selectcompany(e);
                }}
                placeholder="Search Company"
              />
            </div>
          </div>
        </div>

        <div>
          <table>
            <thead id="thead-company">
              <tr>
                <th>SR.</th>
                <th>CODE</th>
                <th>NAME</th>
                <th>PHONE</th>
                <th className="wd-200">ADDRESS</th>
                <th>
                  <img
                    className="icon add-item"
                    style={{ right: "8%" }}
                    src="/images/table-icons/download.png"
                    onClick={() =>
                      this.props.data.companies.length
                        ? this.saveData(
                            this.props.data.companies,
                            "Companies.csv"
                          )
                        : alert("Please Enter Company")
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
                      this.setState({ openCompanyForm: true });
                    }}
                    className="icon add-item"
                    src="/images/add-icon.png"
                  />
                </th>
              </tr>
            </thead>
            <tbody className={(rendercompanies||company_Filter).length>6?"bodystyle-company":''}>
              {company_Filter.length != 0
                ? company_Filter.map((company, i) => {
                    return (
                      <tr id="tbodytr-company" >
                        <td>
                          <b>{i + 1}</b>
                        </td>
                        <td>{company.code}</td>
                        <td>{company.name}</td>
                        <td>{company.phone}</td>
                        <td className="wd-200">{company.address}</td>
                        <td>
                          <img
                            title="Edit"
                            onClick={() => {
                              this.setState({
                                targetCompany: company,
                                openCompanyForm: true
                              });
                            }}
                            className="icon pointer"
                            src="/images/table-icons/edit-icon.png"
                          />
                              <img
                            title="Delete"
                            onClick={() => this.deleteArea(company._id)}
                            className="icon pointer"
                            src="/images/table-icons/del-icon.png"
                          />
                          <button
                            onClick={this.toggleStatus.bind(null, company)}
                            className={
                              company.status
                                ? "control-btn"
                                : "control-btn disabled-btn"
                            }
                          >
                            {company.status ? "Deactivate" : "Activate"}
                          </button>
                        </td>
                        {/* <td>
                    <Link to={'/accountsdetails/'+supplier.id}>
                            <img className="icon" src="/images/details-icon.png" />
                    </Link>
                     </td> */}
                      </tr>
                    );
                  })
                : rendercompanies.map((company, i) => {
                    return (
                      <tr id="tbodytr-company" >
                        <td>
                          <b>{i + 1}</b>
                        </td>
                        <td>{company.code}</td>
                        <td>{company.name}</td>
                        <td>{company.phone}</td>
                        <td className="wd-200">{company.address}</td>
                        <td>
                          <img
                            title="Edit"
                            onClick={() => {
                              this.setState({
                                targetCompany: company,
                                openCompanyForm: true
                              });
                            }}
                            className="icon pointer"
                            src="/images/table-icons/edit-icon.png"
                          />
                              <img
                            title="Delete"
                            onClick={() => this.deleteArea(company._id)}
                            className="icon pointer"
                            src="/images/table-icons/del-icon.png"
                          />
                          <button
                            onClick={this.toggleStatus.bind(null, company)}
                            className={
                              company.status
                                ? "control-btn"
                                : "control-btn disabled-btn"
                            }
                          >
                            {company.status ? "Deactivate" : "Activate"}
                          </button>
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
  }
}

export default connect(
  store => {
    return {
      data: {...store.companyReducers,...store.productReducers}
    };
  },
  dispatch => {
    return {
      toggleState: args => {
        dispatch(middleware.createCompany(args));
      },
      uploadCompany: args => {
        dispatch(middleware.uploadCompany(args));
      },
      deleteArea: areaId => {
        dispatch(middleware.deleteCompnay(areaId));
      }
    };
  }
)(Company);
