import React from "react";
import ReactToPrint from "react-to-print";
import Typography from "@material-ui/core/Typography";
import "./billPrintReport.css";
import cut from '../../../../images/cut.png'
export default class ComponentToPrint extends React.Component {
  render() {

     console.log(this.props.data)
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
              <b>Ph#:</b> 0300-6565765 / 03354655864
            </span>
          </Typography>
        </div>
         <br/>
        <div>
          <span className="billsheading"></span>
          <span className="bill-from-to">
           
  Bills Report{/* { Enter billNumber  like  2 to 2 or data} */}
          </span>
        
        <hr /> 
        </div>
        <center>
          <div className="table-setting">
          <table className="tableset">
          <thead>
            <tr>
            <th className="thset">company Name</th>
                <th className="thset">Product Name</th>
                <th className="thset">Cartons</th>
                <th className="thset">Units</th>
                <th className="thset">Free Units</th>
             
            </tr>
            </thead>
            <tbody >
            {this.props.data.map((sale, i) => {
                return (
                  <tr key={i} className="bordershow">
                    
                
                      <td className="tdset">
                        {sale.bills.slice(0, -1).map(product => {
                          return product.product.company.name;
                        })}
                      </td>
                    

                      <td className="tdset">
                      {sale.bills.slice(0, -1).map(product => {
                        return product.product.name;
                      })}
                    </td>
                    <td className="tdset">
                      {sale.bills.slice(0, -1).map(product => {
                        return product.crtn;
                      })}
                    </td>
                    <td className="tdset">
                      {sale.bills.slice(0, -1).map(product => {
                        return product.units;
                      })}
                    </td>
                    <td className="tdset">
                      {sale.bills.slice(0, -1).map(product => {
                        return product.fUnit;
                      })}
                    </td>
                  </tr>
                );
              })}
      
              
            </tbody>
          </table>
          </div>
        </center>
      
        <br/> <br/>
        <img src={cut}  className="img-cut"/>
      </div>
    );
  }
}
