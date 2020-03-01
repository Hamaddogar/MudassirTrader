// import {signup} from './../Action/actionCreater'
import * as actionCreater from "./../Action/actionCreater";
import { store } from "./../store";
import history from "../../historyProvider";
import messages from "../../message";
import { toast } from "react-toastify";


export const middlewaresignup = data => {
  console.log(data);
  return dispatch => {
    // return dispatch(actionCreater.login(data))
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(resp => {
        return resp.json();
      })
      .then(resp => {
            
         console.log("login user s",resp)
        
        debugger;

        console.log("this is  data", resp.data);
        debugger;
        dispatch(actionCreater.login(resp));
        if (resp.success===true) {
          localStorage.setItem("token", resp.token);

         

        
          history.push("/dashboard")
          debugger;
          if (resp.user.companies != undefined) {
            store.dispatch({
              type: "COMPANIES_LOADED",
              payload: resp.data.companies
            });
          }

          store.dispatch({
            type: "CATEGORIES_LOADED",
            payload: resp.data.categories
          });

          store.dispatch({
            type: "ATTENDANCE_LOADED",
            payload: resp.data.attendance
          });

          store.dispatch({
            type: "PRODUCTS_LOADED",
            payload: resp.data.products
          });

          store.dispatch({
            type: "AREAS_LOADED",
            payload: resp.data.areas
          });

          store.dispatch({
            type: "SUPPLIERS_LOADED",
            payload: resp.data.suppliers
          });

          store.dispatch({
            type: "CUSTOMERS_LOADED",
            payload: resp.data.customers
          });

          store.dispatch({
            type: "PURCHASES_LOADED",
            payload: resp.data.mypurchases
          });

          store.dispatch({
            type: "EXPENSES_LOADED",
            payload: resp.data.expenses
          });

          store.dispatch({
            type: "SALES_LOADED",
            payload: resp.data.sales
          });

          store.dispatch({
            type: "USERS_LOADED",
            payload: resp.data.users
          });

          store.dispatch({
            type: "STORE_LOADED",
            payload: resp.data.store
          });

       
        } else {
          toast.error(messages.loginuser.error);
          
        }
      });
  };
};
export const middlewareLogin = data => {
  console.log(data);
  return dispatch => {
    // return dispatch(signup(data))
  };
};
