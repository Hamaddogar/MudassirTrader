import utlities from "../../utlities";

let initialData = {
  customers: []
};

export default (state = initialData, action) => {
  let newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case "persist/REHYDRATE":
      action.payload &&
        (newState.customers = action.payload.customerReducer.customers);
      break;

    case "CUSTOMER_UPDATED":
      let newUpdateCustomer = Object.assign({}, newState, {
        customers: newState.customers.map(customer => {
          return customer._id == action.payload._id
            ? (customer = action.payload)
            : customer;
        })
      });
      console.log("re", newUpdateCustomer);
      return newUpdateCustomer;
    case "CUSTOMERS_CREATED":
      newState.customers = [...newState.customers, ...action.payload];
      break;
    case "CUSTOMER_DELETED":
      let newData = Object.assign({}, newState, {
        customers: newState.customers.filter(customer => {
          return customer._id != action.payload._id;
        })
      });
      console.log("re", newData);
      return newData;

      break;
    case "CUSTOMERS_LOADED":
      return Object.assign({}, newState, {
        customers: (newState.customers = action.payload)
      });
      break;

    case "CUSTOMER_CREATED":
      newState.customers.push(action.payload);
      break;

    case "CUSTOMER_STATUS_UPDATED":
      newState.customers.forEach(customer => {
        if (customer._id == action.payload._id) {
          customer.status = action.payload.status;
          return false;
        }
      });
      break;
  }

  newState.code = utlities.getID("C", "code", newState.customers);

  return newState;
};
