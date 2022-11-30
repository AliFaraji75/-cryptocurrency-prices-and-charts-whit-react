import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Container } from "@mui/system";
import Carousel from './Carousel';
import backimg from '../../assets/banner2.jpg'

const useStyle=makeStyles(()=>({
   container:{
    display:"flex",
     flexDirection:"column",
     justifyContent:"space-around",
    height:400,
    backgroundColor:"efefef",
    paddingTop:30,
    backgroundImage:`url(${backimg}) !important`,
    backgroundRepeat:"no-repeat",
   
    
   },
   bannerContent:{
    isplay:"flex",
     flexDirection:"column",
     justifyContent:"center",
     textAlign:"center",
     height:"40%"
   }

}))
const Banner = () => {
    const classes =useStyle();
    return ( 
        <>
      <div className={classes.container} >
          <Container  className={classes.bannerContent}>
              <Typography variant="h3" style={{fontWeight:"bold",marginBottom:15}}>
                  Crypto Snow
              </Typography>
              <Typography variant="h6" style={{opacity:.6}}>
                 Get All The Info Regarding Your Favorite Crypto Currency
              </Typography>
          </Container>
          
          <Carousel />

        
      </div>
        </>
     );
}
 
export default Banner;