import React from "react";
import ReactToPrint from "react-to-print";
import Typography from "@material-ui/core/Typography";
import "./billPrintReport.css";
import cut from '../../../../images/cut.jpg'
export default class ComponentToPrint extends React.Component {
  render() {

     console.log(this.props.data)
    return (
      <div>
        <div className="topheading">
          <Typography variant="h6" gutterBottom>
            MUDASSIR TRADER'S
          </Typography>
        </div>

        <div className="addressSetting">
          <Typography variant="subtitle2" gutterBottom>
            <b>Address</b>: RAILWAY ROAD NEAR ROSHAN MASJID PIRMAHAL
            <span className="Phonenumber">
              <b>Ph#:</b> 0300-6565765 / 03354655864
            </span>
          </Typography>
        </div>
         <br/>
        <div>
          <span className="billsheading">Bills </span>
          <span className="bill-from-to">
           
            2 to 2{/* { Enter billNumber  like  2 to 2 or data} */}
          </span>
        
        <hr /> 
        </div>
        <center>
          <table className="thd">
          <thead>
            <tr>
            <th>company Name</th>
                <th>Product Name</th>
                <th>Cartons</th>
                <th className="wd-200">Units</th>
                <th>Free Units</th>
             
            </tr>
            </thead>
            <tbody >
            {/* {this.props.data.map((sale, i) => {
                return (
                  <tr key={i} className="bordershow">
                    
                
                      <td>
                        {sale.bills.slice(0, -1).map(product => {
                          return product.product.company.name;
                        })}
                      </td>
                    

                    <td>
                      {sale.bills.slice(0, -1).map(product => {
                        return product.product.name;
                      })}
                    </td>
                    <td>
                      {sale.bills.slice(0, -1).map(product => {
                        return product.crtn;
                      })}
                    </td>
                    <td className="wd-200">
                      {sale.bills.slice(0, -1).map(product => {
                        return product.units;
                      })}
                    </td>
                    <td>
                      {sale.bills.slice(0, -1).map(product => {
                        return product.fUnit;
                      })}
                    </td>
                  </tr>
                );
              })} */}
      
              
            </tbody>
          </table>
        </center>
        <br/> <br/>
        <img src={cut}  className="cut-style"/>
      </div>
    );
  }
}
