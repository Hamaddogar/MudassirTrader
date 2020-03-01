import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// import Addproducts from './newproduct';
import AutoComplete from "../../autocompletion/autocompletion";
class products extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      supplier: ""
    };
  }
  updateState = evt => {
    this.state[evt.target.id] = evt.target.value;
    this.setState(this.state);
    console.log("billNumbers", this.state.customer);
    let newArray = this.props.data.products.filter(product => {
      console.log(product);
      return product.supplier.firstName == this.state.supplier
      
    });
    this.setState({ products: newArray });
  };

  // filterByString = () => {
  //   console.log("working");
  //   let newArray = this.props.data.products.filter(product => {
  //     console.log(product);
  //     return product.area.name == this.state.name;
  //   });
  //   this.setState({ products: newArray });
  // };
  getStock = product => {
    debugger;
    let carton = 0;
    let unit = 0;
    if (product.quantityType == "unit") {
      unit = product.productQty;
    }
    if (product.quantityType == "carton") {
      carton = Math.round(product.productQty / product.cartonSize);

      let remainUnits =  product.productQty - carton * product.cartonSize;
      unit += +remainUnits;
    }
    // return carton;
    return {
      carton: carton,
      unit: unit
    };
  };
  render() {
    return (
      <section className="app-section">
        {/* <Addproducts /> */}
        <div className="label-head">
          <img src="/images/label-head.png" />
          <h4>Products Report</h4>
        </div>

        <div className="row">
          <div class="input-field col s3">
            <AutoComplete
              property="firstName"
              // getOptionLabel= {option =>option.billNo.toString()}
              onChange={(evt, supplier) => {
                console.log("sals chane", supplier);
                supplier &&
                  this.updateState({
                    target: {
                      id: "supplier",
                      value: supplier.firstName
                    }
                  });
              }}
              data={this.props.data.suppliers}
              placeholder="select supplier"
            />
          </div>
          {/* <div class="input-field col s3">
            <button
              class="btn waves-effect waves-light"
              name="action"
              onClick={this.filterByString}
            >
              view
            </button>
          </div> */}
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>

                <th colspan="2">Product Stock</th>
              </tr>
              <tr>
                <th></th>
                <th></th>

                <th>Carton</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody>
              {this.props.data.products 
                ? this.props.data.products.map((product, i) => {
                    return (
                      <tr key={i}>
                        <td>{product.code}</td>
                        <td>{product.name}</td>
                        <td> {this.getStock(product).carton}</td>
                        <td>{this.getStock(product).unit}</td>
                        {/* <td>{this.getStock(product.bills).unit}</td> */}
                      </tr>
                    );
                  })
                : []}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}

export default connect(store => {
  console.log(store);
  return {
    data: { ...store.productReducers, ...store.supplierReducer }
  };
})(products);
