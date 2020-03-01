import React from "react";
import ReactToPrint from "react-to-print";
import Typography from "@material-ui/core/Typography";
import "./salesprint.css";
import cut from "../../../images/cut.png";
import urdunotes from "../../../images/notes.png";
import { connect } from "react-redux";

import { T } from "antd/lib/upload/utils";
export default class ComponentToPrint extends React.Component {
  render() {
    console.log("store",this.props.store)

    var today = new Date();
    var date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();

    let customerName = this.props.customerdata.customers.filter(
      customerName => {
        return customerName._id === this.props.data.customer;
      }
    );

    console.log("customer NAME", customerName);
    //  sale.bills.slice(0, -1).map(product => {
    //   return product.units;
    // })}
    return (
      <div>
        <div className="topheading">
          <Typography variant="h6" gutterBottom>
              {this.props.store.store.name}
          </Typography>
        </div>
        <div className="addressSetting">
          <Typography variant="subtitle2" gutterBottom>
            <b>Address</b>: RAILWAY ROAD NEAR ROSHAN MASJID PIRMAHAL
            <span className="Phonenumber">
              <b>Ph#:</b> 0300-6565765 / 0335-4655864
            </span>
            <hr className="hrstyle-one" />
            Date :{date} &nbsp;&nbsp;&nbsp; <b>invt #&nbsp; </b>
            {this.props.data.billNo}
          </Typography>
        </div>
        <br />
        <div>
          <span className="billsheading">
            Customer Name :<b>{customerName.map(Name => Name.firstName)} </b> ({" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Area :  {customerName.map(Name => Name.area.name)}){" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Phone #:  {customerName.map(Name => Name.phone)}{" "}
          </span>
          <span className="bill-from-to"></span>
        </div>
        <center>
          <div className="settable-side">
            <table className="tableset">
              <tr>
                <th className="thset"> Product Name </th>
                <th className="thset">Crtn</th>
                <th className="thset"> Unit</th>
                <th className="thset">F.Unit</th>
                <th className="thset">Unit Price</th>
                <th className="thset">Shope Keeper Price</th>
                <th className="thset">Total</th>
                <th className="thset" colSpan="2">
                  {" "}
                  % Disc Rs
                </th>
                <th className="thset"> Unit Disc</th>
                <th className="thset">Net</th>
              </tr>
             
              <tr >
                      <td className="tdset">{this.props.data.bills[0].product.name}</td>
                      <td className="tdset">{this.props.data.bills[0].crtn}</td>
                      <td className="tdset">{this.props.data.bills[0].units}</td>

                      <td className="tdset">{this.props.data.bills[0].fUnit}</td>
                      <td className="tdset">{this.props.data.bills[0].uPrice}</td>
                      <td className="tdset">{this.props.data.bills[0].shopkeeperPrice}</td>
                      <td className="tdset">{this.props.data.bills[0].total}</td>

                      <td className="tdset">{this.props.data.bills[0].discountPerc}</td>
                      <td className="tdset">{this.props.data.bills[0].discounteAmt}</td>
                      <td className="tdset">{this.props.data.bills[0].unitDisc}</td>
                  <td className="tdset">{this.props.data.bills[0].net}</td>


                    </tr>
            </table>
          </div>
        </center>
        <hr />
        <div className="div3">
          Total Bill Amount &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                  
                    <tr >                     
                <td className="tdset">{this.props.data.bills[0].total}</td>
                    </tr>
                 <br />
          Total item Discount &nbsp;&nbsp;&nbsp;({this.props.totalDicount}) <br />
          Total Unit Discount &nbsp;&nbsp;&nbsp; ( {this.props.totalUnitDiscount}) <br />
          Bill Discount &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp; (    {this.props.data.billDiscount})
        </div>{" "}
        <div>
          <div className="div1">
            <b>
              {" "}
              ________________________________
              <b /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              _________________________________
              <br />
              &nbsp;&nbsp;&nbsp; <b /> SalesMan's Signature
            </b>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>Customer's Signature</b>{" "}
          </div>
        </div>
        <hr className="hrstyle-one" />
        <div className="total-payable-bill">
          Total payable &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {this.props.totalpay}
        </div>
        <div></div>
        <hr className="hrstyle-one" />
        <div className="urdu-notes2">
          <b>: نوٹ</b>
        </div>
        <div className="urdu-Notes">
          اسٹاک پاوڈر3 ماہ اورلیکوڈ 15 دن قبل ایکسپالری تبدیل کروانا دوکان دارکی
          ذمہ داری ہوگی۔اسٹاک موقع پرتسلی سے پورا کریں۔بعد ازاں{" "}
        </div>
        <div className="urdu-notes2">
          کمپنی ذمہ دار نہ ہو گی۔سیل مین سے زاتی لین دین کا ذمہ داردوکاندارخود
          ہو گا شکریہ۔{" "}
        </div>
        <br />
        <br />
        <div>
          <img className="img-cut" src={cut} />
        </div>
      </div>
    );
  }
}
