import React,{Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './dashboard.css'
 import  tp from  '../../images/tp.png';
 import  totalsale from  '../../images/totalsale.png';

 import { connect } from "react-redux";
import { OmitProps } from 'antd/lib/transfer/renderListBody';
import { store } from "../../store/store";
import { useEffect } from 'react';


const useStyles = makeStyles({
  card: {
    maxWidth: 378,
  },
});



class  ImgMediaCard  extends React.Component {
  // const classes = useStyles();
componentDidMount()
  {
    store.dispatch({
      type: "FLUSH_MENU",
      payload: []
    });
    

  }

   render()
   {



  return (

    <div className="dashboard-container">
    
      <div className="carddisplay">
      <div class="col s12 m7">
    
    <div class="card horizontal">
      <div class="card-image">
        <img src="data:image/png;base64,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" width="50"height="70"/>
      </div>
      <div class="card-stacked">
        <div class="card-content">
        <Typography gutterBottom variant="h5" component="h2">
                 Total Purchase  {this.props.data.purchases.length ?this.props.data.purchases.length:0 }
                    <br/>
          </Typography>
          {/* <p>  1-1-2020 to 1-19-2020</p> */}
        </div>
        {/* <div class="card-action">
          <a href="#">This is a link</a>
        </div> */}
      </div>
    </div>
  </div>
   

<div className="carddisplay1">
<div class="col s12 m7">
    
    <div class="card horizontal">
      <div class="card-image">
        <img src="https://image.flaticon.com/icons/png/512/1389/1389181.png" width="100"height="70"/>
      </div>
      <div class="card-stacked">
        <div class="card-content">
        <Typography gutterBottom variant="h5" component="h2">
                 Total Sales  {this.props.data.sales.length ?this.props.data.sales.length:0 }
                    <br/>
          </Typography>
          {/* <p>  1-1-2020 to 1-19-2020</p> */}
        </div>
        {/* <div class="card-action">
          <a href="#">This is a link</a>
        </div> */}
      </div>
    </div>
  </div>
            
    </div>
    </div>
  
    </div>
  );
}
}
export default connect(store => {
  console.log(store)
  return {
    data: {
      ...store.salesReducer,
      ...store.purchaseReducer,
    }
  };
})(ImgMediaCard);
