import React from "react";
import Dashboard from "./dasboard/dashboard";
import Login from "./loginForm/loginform";
import Mymain from './main'
import './main.css'
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter,
  Redirect,
  Switch
} from "react-router-dom";
import { connect } from "react-redux";
import Supplier from "./settings/supplier/supplier";
import Product from "./settings/products/product";
import CompanySettings from "./settings/companies/companySettings";
import CategorySettings from "./settings/categories/categories";
import AreaSettings from "./settings/areas/areas";

import Attendance from "./attendance/attendance";
import Store from "./settings/store/settings";

import Sales from "./sales/sales";
import NewSale from "./sales/newSale";

import Salary from "./settings/salary/salary";

import Expenses from "./expenses/expenses";
import Recoverybills from "./reporting/recoveryBillReport/recoveryBillReport";
import OrderMissingReport from "./reporting/orderMissingReport/orderMissingReport";
import RecoveryView from "./reporting/RecoveryView/RecoveryView";
import BillRouteWaseSummary from "./reporting/billRouteWaseSummary/billRouteWaseSummary";
import SuppliersReport from "./reporting/suppliers/suppliers";
import StockReport from "./reporting/stockReport/stockReport";
import ClosingStockReport from "./reporting/closingStockReport/closingStockReport";
import SalesReport from './reporting/sales/sales'
import PurchasesReport from './reporting/purchases/purchases'

import SupplierDetails from "./accounts/supplierDetails";
import SupplierSettings from "./settings/supplier/supplier"
import Customersledgers from "./accounts/customersledgers";
import CutomerDetails from "./accounts/cutomerDetails";
import CustomerSettings from "./settings/customers";
import UserSettings from "./settings/users/users";
import NewPurchase from "./purchases/newPurchases";
import Purchase from "./purchases/purchases";
import Header from "./navbar/navbar";
import Recovery from "./recovery/recovery";
import PricingSetting from './settings/pricing/productPricing'
import Bills from './reporting/bills/bills'
import dashboard from "./dasboard/dashboard";
 import PasswordSetting from './settings/password-setting/password-setting'
import passwordSetting from "./settings/password-setting/password-setting";

class Main extends React.Component {
  render() {

      let tokenget=localStorage.getItem("token")
    return (

      <>
        
        
        {tokenget?"":<Redirect to ="/"/>}
        {tokenget?<Header/>:<Redirect to ="/"/>}


        <Route path="/" component={Login} /> 
        {/* <Route path="/" component={MainComponent}/> */}
        <Route path="/dashboard" component={Dashboard} />
       
      


      
          {tokenget? <Route path="/accounts/suppliers" component={Supplier} />:null}
       {tokenget?    <Route path="/accounts/customersledgers" component={Customersledgers} />:null}

        <Route path="/supplier_details" component={SupplierDetails} />
        <Route path="/customer_details" component={CutomerDetails} />

        <Route path="/attendance" component={Attendance} />

        <Route path="/sales" component={Sales} />
        <Route path="/newsale/" component={NewSale} />

        <Route path="/recovery" component={Recovery} />

        <Route path="/newpurchase" component={NewPurchase} />
        <Route path="/purchases" component={Purchase} />

        <Route path="/expenses" component={Expenses} />
        <Route path="/setting/password-setting" component={passwordSetting} />
        

        {/* <Route path="/reporting"   component={Sales}/> */}


     
        <Route path="/reporting/recoverybills" component={Recoverybills} />
        <Route path="/reporting/missing" component={OrderMissingReport} />
        <Route path="/reporting/recoveries" component={RecoveryView} />
        <Route path="/reporting/bills" component={Bills} />
        <Route path="/reporting/billsummary" component={BillRouteWaseSummary} />
        <Route path="/reporting/suppliers" component={SuppliersReport} />
        <Route path="/reporting/stockreport" component={StockReport} />
        <Route path="/reporting/closingstock" component={ClosingStockReport} />
        <Route path="/reporting/sales" component={SalesReport} />
        <Route path="/reporting/purchases" component={PurchasesReport} />

        <Route path="/salary" component={Salary} />

        <Route path="/settings/store" component={Store} />

        <Route path="/settings/companies" component={CompanySettings} />
        <Route path="/settings/categories" component={CategorySettings} />
        <Route
          path="/settings/customers"
          render={() => {
            return <CustomerSettings showAddBtn={true} />;
          }}
        />

        <Route
          path="/settings/products"
          render={() => {
            return <Product />;
          }}
        />

        <Route path="/settings/users" component={UserSettings} />
        <Route path="/settings/areas" component={AreaSettings} />
        <Route path="/home" component={Dashboard} />
  

        <Route path="/settings/pricing" component={PricingSetting} />



        <Route
          path="/settings/suppliers"
          render={() => {
            return <SupplierSettings showAddBtn={true}></SupplierSettings>;
          }}
        />
   {tokenget?<div>
            {this.props.menuReducers.loadedMenu.length ? (
          <div className="menu-container flex">
            {this.props.menuReducers.loadedMenu.map(item => {
              return (
                <Link to={item.link}>
                  <div className="menuitem">
                    <img src={"/" + item.icon} />
                    <div className="label">{item.name}</div>
                    {/* {item} */}
                  </div>
                </Link>
              );
            })}
          </div>
        ) : []} </div>:[]}
      </>
    );
  }
}

export default connect(store => {
  return {
    menuReducers: store.dropdownReducers,
    ...store.loginReducers
  };
})(withRouter(Main));
