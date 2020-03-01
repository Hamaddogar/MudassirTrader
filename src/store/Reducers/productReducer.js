import utlities from "../../utlities";

let initialData = {
  products: [
    // { id: 1, code: 'PROD1', cartonSize: 12, name: 'product1', supplier: { name: 'NESTLE' }, cost: 100, shopkeeperPrice: 132.083, margin: 10, customerPrice: 140, productQty: '50', time: new Date().toLocaleDateString() },
    // { id: 2, code: 'PROD2', cartonSize: 8, name: 'product2', supplier: { name: 'NESTLE' }, cost: 100, shopkeeperPrice: 120, margin: 10, customerPrice: 90, productQty: '20', time: new Date().toLocaleDateString() },
    // { id: 3, code: 'PROD3', cartonSize: 14, name: 'product3', supplier: { name: 'NESTLE' }, cost: 100, shopkeeperPrice: 120, margin: 10, customerPrice: 190, productQty: '8', time: new Date().toLocaleDateString() },
    // { id: 4, code: 'PROD4', cartonSize: 10, name: 'product4', supplier: { name: 'NESTLE' }, cost: 100, shopkeeperPrice: 120, margin: 10, customerPrice: 140, productQty: '16', time: new Date().toLocaleDateString() },
    // { id: 5, code: 'PROD5', cartonSize: 12, name: 'product5', supplier: { name: 'NESTLE' }, cost: 100, shopkeeperPrice: 120, margin: 10, customerPrice: 730, productQty: '22', time: new Date().toLocaleDateString() },
    // { id: 6, code: 'PROD6', cartonSize: 8, name: 'product6', supplier: { name: 'NESTLE' }, cost: 100, shopkeeperPrice: 120, margin: 10, customerPrice: 220, productQty: '9', time: new Date().toLocaleDateString() },
    // { id: 7, code: 'PROD7', cartonSize: 16, name: 'product7', supplier: { name: 'NESTLE' }, cost: 100, shopkeeperPrice: 120, margin: 10, customerPrice: 350, productQty: '8', time: new Date().toLocaleDateString() },
    // { id: 8, code: 'PROD8', cartonSize: 10, name: 'product8', supplier: { name: 'NESTLE' }, cost: 100, shopkeeperPrice: 120, margin: 10, customerPrice: 180, productQty: '18', time: new Date().toLocaleDateString() },
    // { id: 9, code: 'PROD9', cartonSize: 12, name: 'product9', supplier: { name: 'NESTLE' }, cost: 100, shopkeeperPrice: 120, margin: 10, customerPrice: 100, productQty: '24', time: new Date().toLocaleDateString() },
    // { id: 10, code: 'PROD10', cartonSize: 1, name: 'product10', supplier: { name: 'NESTLE' }, cost: 100, shopkeeperPrice: 120, margin: 10, customerPrice: 90, productQty: '26', time: new Date().toLocaleDateString() }
  ]
};

export default (state = initialData, action) => {
  let newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case "persist/REHYDRATE":
      action.payload &&
        (newState.products = action.payload.productReducers.products);
      break;

    case "PRODUCTS_LOADED":
      newState.products = action.payload;
      break;

    case "PRODUCT_UPDATED":
      let updatedpurchase = Object.assign({}, newState, {
        products: newState.products.map(product => {
          console.log(action.payload);
          debugger;
          return product._id == action.payload._id
            ? (product = action.payload)
            : product;
        })

      });
      return  updatedpurchase;
    case "PRODUCTS_UPDATED":
      console.log(newState);

      let updateSaleproduct = Object.assign({}, newState, {
        products: newState.products.map((product, index) => {
          console.log(action.payload);
          debugger;
          // if (action.payload[index] != null) {

          if (action.payload[index]) {
            return product._id == action.payload[index]._id
              ? (product = action.payload[index])
              : product;
          }
          return product;

          // }
        })
      });
      console.log(updateSaleproduct);
      return updateSaleproduct;

    case "PRODUCT_CREATED":
      newState.products.push(action.payload);

      break;

    case "PRODUCTS_CREATED":
      let newDataproducts = Object.assign({}, newState, {
        products: [...newState.products, ...action.payload]
      });
      console.log(newDataproducts);
      return newDataproducts;
      break;
    case "PRODUCT_STATUS_UPDATED":
      newState.products.forEach(product => {
        if (product._id == action.payload._id) {
          product.status = action.payload.status;
          return false;
        }
      });
      break;
    case "PRODUCT_DELETED":
      let newproduct = Object.assign({}, newState, {
        products: newState.products.filter(product => {
          console.log(action.payload);
          return product._id != action.payload._id;
        })
      });
      return newproduct;
      case "PRODUCTS_DELETED":
        let newFilterByCompanyProduct = Object.assign({}, newState, {
          products: newState.products.filter(product => {
            return product.company._id != action.payload._id;
          })
        });
        console.log(newFilterByCompanyProduct)
        return newFilterByCompanyProduct
  }

  newState.productCode = utlities.getID("P", "code", newState.products);
  return newState;
};

// export default productReducer;
