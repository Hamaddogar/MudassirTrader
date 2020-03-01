import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddArea from "./addArea";
import middleware from "../../../store/Middleware/area";
import Pagination from "react-js-pagination";
import "./area.css";
import Papa from "papaparse";
import utlities from "../../../utlities";
import TableScrollbar from 'react-table-scrollbar';
// const Area = (this.propss) => {
class Area extends React.Component {
  // let [addingArea, showAddArea] = useState(false);
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemPerPage: 10,
      file: ""
    };
  }

  state = {
    targetArea: {},
    openAreaForm: false
  };
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }
  pageNumberHandler=(e)=>{
     
     let getpagenumber =e.target.value
      if(getpagenumber<10)
      {
           return;


      }
      else{
      this.setState({
       itemPerPage:getpagenumber

      })
    }

  }
  // toggleStatus = area => {
  //   area.status = !area.status;
  //   this.props.toggleState(area);
  // };
  deleteArea = id => {
    let isDelete = window.confirm("Confirm Delete Area");
    if (isDelete) {
      return this.props.deleteArea(id);
    }
  };
  getArea = area => {
    this.props.createArea(area);
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
            let newIndex = utlities.getID("A", "code", self.props.data.areas);
            item.code = "A" + (+newIndex.slice(1) + index);
            index += 1;
          });
          self.props.uploadArea(filterDAta);
        }
      });
    });
  };

  csvGenrate = () => {};
  searchArea = e => {
    let searchArea = e.target.value;
    this.setState({
      searchArea: searchArea
    });
  };
  saveData = (function() {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function(data, fileName) {
      data.forEach(product => {
        delete product._id
        delete product.lastUpdated
        delete product.__v
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
    // pagination Code
    let indexOfLastitem = this.state.activePage * this.state.itemPerPage;
    let indexOfFirstitem = indexOfLastitem - this.state.itemPerPage;
    let renderedArea = this.props.data.areas.slice(
      indexOfFirstitem,
      indexOfLastitem
    );
    const searchArea_Filter = renderedArea.filter((item, index) => {
      return item.name
        .toLowerCase()
        .includes(
          this.state.searchArea ? this.state.searchArea.toLowerCase() : ""
        );
    });
    return (
      <section className="app-section">
        {this.state.openAreaForm ? (
          <AddArea
            area={this.state.targetArea}
            // getArea={this.getArea}
            showAddArea={() => {
              this.setState({
                openAreaForm: false
              });
            }}
          />
        ) : null}
        <div className="label-head">
          {/* <button className ="control-btn"  onClick = {()=>alert('working')} >Download csv</button> */}

          <img src="/images/label-head.png" />
          <h4
            style={{
              marginLeft: "-25%"
            }}
          >
            Areas<span className="area-total"> {this.props.data.areas.length}</span>
          </h4>
          {this.props.data.areas.length != 0 ? (
          <div className="pagination-input-style-area">
           
              <div id="paggination-Setting">
                <Pagination
                  activePage={this.state.activePage}
                  itemsCountPerPage={renderedArea.length}
                  totalItemsCount={this.props.data.areas.length}
                  pageRangeDisplayed={renderedArea.length}
                  onChange={pageNumber => this.handlePageChange(pageNumber)}
                />
              </div>
           

            <div className="page-setting">
              <select
                id="dropdown-style-area"
                onChange={e => {
                  this.pageNumberHandler(e);
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
              className="selectstyle"
              onChange={e => {
                this.searchArea(e);
              }}
              placeholder="Search Area"
            />
          </div>
        </div>

        <div>
        
          <table>
            <thead  className="thead-area" >
              <div></div>
              <tr>
                <th>SR.</th>
                <th>CODE</th>
                <th >NAME</th>
                <th >LAST UPDATED</th>
                <th>
                  <img
                    className="icon add-item"
                    style={{ right: "8%" }}
                    src="/images/table-icons/download.png"
                    onClick={() =>
                      this.props.data.areas.length
                        ? this.saveData(this.props.data.areas, "Areas.csv")
                        : alert("Please Enter Aera")
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
                      // showAddArea(true)
                      this.setState({
                        targetArea: {},
                        openAreaForm: true
                      });
                    }}
                    className="icon add-item"
                    src="/images/add-icon.png"
                  />
                </th>
              </tr>
            </thead>
            {/* <ScrollArea
            speed={0.8}
            className="area"
            contentClassName="content"
            horizontal={false}
            > */}
            <tbody  className={(renderedArea || searchArea_Filter).length>6?"bodystyle-area":""}>
           
              {searchArea_Filter.length != 0
                ? searchArea_Filter.map((area, i) => {
                    console.log(area);
                    return (
                      <tr className="tbody-area">
                        <td>
                          <b>{i + 1}</b>
                        </td>
                        <td>{area.code}</td>
                        <td >{area.name}</td>
                        <td >
                          {new Date(area.lastUpdated).toDateString()}
                        </td>
                        <td>
                          <img
                            title="Edit"
                            onClick={() => {
                              this.setState({
                                targetArea: area,
                                openAreaForm: true
                              });
                            }}
                            className="icon pointer"
                            src="/images/table-icons/edit-icon.png"
                          />
                          {/* <button
                        onClick={this.toggleStatus.bind(null, area)}
                        className={
                          area.status
                            ? "control-btn"
                            : "control-btn disabled-btn"
                        }
                      >
                        {area.status ? "Activate" : "Deactivate"}
                      </button> */}
                          <img
                            title="Delete"
                            onClick={() => this.deleteArea(area._id)}
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
                : renderedArea.map((area, i) => {
                    console.log(area);
                    return (
                      <tr   className="tbody-area">
                        <td >
                          <b>{i + 1}</b>
                        </td>
                        <td >{area.code}</td>
                        <td >{area.name}</td>
                        <td >
                          {new Date(area.lastUpdated).toDateString()}
                        </td>
                        <td>
                          <img
                            title="Edit"
                            onClick={() => {
                              this.setState({
                                targetArea: area,
                                openAreaForm: true
                              });
                            }}
                            className="icon pointer"
                            src="/images/table-icons/edit-icon.png"
                          />
                          {/* <button
                        onClick={this.toggleStatus.bind(null, area)}
                        className={
                          area.status
                            ? "control-btn"
                            : "control-btn disabled-btn"
                        }
                      >
                        {area.status ? "Activate" : "Deactivate"}
                      </button> */}
                          <img
                            title="Delete"
                            onClick={() => this.deleteArea(area._id)}
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
               {/* </ScrollArea> */}
          </table>
          
       

          {/* Paggination Code */}
        </div>
      </section>
    );
  }
}

export default connect(
  store => {
    return {
      data: { ...store.areaReducers }
    };
  },
  dispatch => {
    return {
      toggleState: args => {
        dispatch(middleware.toggleAreaState(args));
      },
      deleteArea: areaId => {
        dispatch(middleware.deleteArea(areaId));
      },
      createArea: data => {
        dispatch(middleware.createArea(data));
      },
      uploadArea: data => {
        dispatch(middleware.uploadArea(data));
      }
    };
  }
)(Area);
