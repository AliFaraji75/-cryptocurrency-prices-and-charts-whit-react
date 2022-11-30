import axios from "axios";
import { useEffect, useState } from "react";
import { CryptoState } from "../../CryptoContext/CryptoContextProvider";
import {TrendingCoins} from '../../Config/api'
import { makeStyles } from "@mui/styles";
import AliceCarousel from 'react-alice-carousel';

import ItemBanner from "./ItemBanner";
import { CircularProgress } from "@mui/material";


const useStyle =makeStyles(()=>({
    container:{
        display:"flex",
        height:"40%",
        alignItems:"center"
    },
   
}))
const Carousel = () => {
    const classes =useStyle();
    const [trending,setTrending]=useState([])
    const {currency,symbol}=CryptoState();

    const fetchDataTranding = async()=>{
        const {data} = await axios.get(TrendingCoins(currency));
        setTrending(data)
    }

    useEffect( ()=>{
        fetchDataTranding();

    },[currency])

    console.log(trending);

    const items =  trending.map(item =>  <ItemBanner item={item} symbol={symbol}/> ) 
    
    const responsive =    {
        0: {
            items: 2,
        },
        300: {
            items: 3
        },
        600: {
            items: 4
        }
    }

  return ( 
         <>
    
      {
        
      trending.length > 0 ?
      <div  className={classes.container}>
        <AliceCarousel
        items={items}
        autoPlay
        autoPlayInterval={1000}
        responsive={responsive}
        disableDotsControls
        infinite
        disableButtonsControls
        />
        </div> : 
        <div 
            style={{textAlign:"center",height:"40%",width:"100%"}}
            >

            <CircularProgress sx={{ color: "gold"}}size={100} thickness={1} />
         </div>
      }   
     

    
    </>
    );

  }


  
 
export default Carousel;