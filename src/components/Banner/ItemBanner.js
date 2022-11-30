import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
const useStyle =makeStyles(()=>({
  
    linkContainer:{
        display:"flex",
        justifyContent:'space-around',
        fontFamily:"serif"
    },
    link:{
        textDecoration:"none",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        textAlign:"center",
        color:"white",
        fontSize:14,
        fontWeight:"bold"
    },
    infoName:{
        display:"flex",
        justifyContent:"space-between",
        width:70,
        alignItems:"baseline",
        fontWeight:"lighter"

    },
    image:{
        width:"60px",
        marginBottom:10,
        height:60
}
}
))
const ItemBanner = ({item,symbol}) => {
    let changePruice =item.market_cap_change_percentage_24h;
    const classes =useStyle();
    return ( 
        <div className={classes.linkContainer}>
            <Link to={`/coins/${item.id}`} className={classes.link} style={{textDecoration:"none"}} >
                <div >
                    <img src={item.image} alt={item.name} className={classes.image}/>
                    <div  style={{textAlign:"left"}}>
                                <div className={classes.infoName} >
                                    <span>{item.symbol}</span>
                                    <span style={changePruice >0 ? {color:"green"}:{color:"red"}} > { item.market_cap_change_percentage_24h.toFixed(2)}%</span> 
                                </div>
                                <div style={{fontSize: 17 ,marginTop:3 ,color:"gold"}}>
                                    {symbol}   {item.current_price.toLocaleString()}
                                </div>
                              </div>
               </div>
                    
            </Link>
     </div>
     );
}
 
export default ItemBanner;