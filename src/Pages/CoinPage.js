import { Grid, Typography, CircularProgress, List } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../Config/api";
import { CryptoState } from "../CryptoContext/CryptoContextProvider";
import ReactHtmlParser from "react-html-parser";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AlertSuccess,AlertRemove } from "../components/Alert";


const useStyles = makeStyles((theme) => ({
  coinImage: {
    marginTop: "20px",
    width: 185,
    height: 185,
  },
}));
const CoinPage = () => {
  const [coin, setCoin] = useState([]);
  const [imagecoin, setImagecoin] = useState("");
  const [description, setDescription] = useState("");
  const [currnetPrice, setCurrentPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [marketCap, setMarketCap] = useState("");
  const { id } = useParams();
  
  const { currency, symbol,setWatchList ,whatchlist} = CryptoState();
  const classes = useStyles();
 
  console.log("  whatchlist.includes(id)",  whatchlist.includes(id),id,whatchlist)


  useEffect(() => {
    const fetchCoin = async () => {
      setLoading(true);
      const { data } = await axios.get(SingleCoin(id));
      setImagecoin(data.image.large);
      setMarketCap( data.market_data.market_cap[currency.toLowerCase()].toLocaleString() );
      setDescription(ReactHtmlParser(data.description.en.split(".")[0]));
      setCurrentPrice(data.market_data.current_price[currency.toLowerCase()].toLocaleString() );
      setCoin(data);
      setLoading(false);
    };
    fetchCoin();
  }, [whatchlist,currency ]);

  return (
    <Grid
      container
      xs={{ backgroundColor: "#16171a", height: "100vh" }}
      spacing={1}
    >
      <Grid item xs={12} md={4} lg={4} gap={1} py={2}>
        {loading ? (
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress sx={{ color: "gold" }} size={150} thickness={1} />
          </div>
        ) : (
          <div
            style={{
              paddingRight: 15,
              borderRight: "2px  solid  #efeeea",
              height: "100vh",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <img
                src={imagecoin}
                alt={coin.name}
                className={classes.coinImage}
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <Typography
                variant="h3"
                style={{ marginTop: 30, fontFamily: "serif" }}
              >
                {coin.name}
              </Typography>
            </div>
            <div>
              <Typography
                variant="subtitle1"
                p={2}
                style={{ textAlign: "Justify", fontFamily: "serif" }}
              >
                {description}
              </Typography>
            </div>
            <Grid container>
              <Grid xs={12}>
                <Typography
                  variant="h5"
                  px={2}
                  mb={1}
                  style={{ fontWeight: "bold", fontFamily: "serif" }}
                >
                  Rank:{" "}
                  <span
                    style={{
                      fontWeight: "l200",
                      fontSize: "22px",
                      fontFamily: "monospace",
                    }}
                  >
                    {coin.coingecko_rank}
                  </span>
                </Typography>
              </Grid>
              <Grid xs={12}>
                <Typography
                  variant="h5"
                  px={2}
                  mb={1}
                  sx={{ fontWeight: "bold", fontFamily: "serif" }}
                >
                  Current Price:{" "}
                  <span
                    style={{
                      fontWeight: "l200",
                      fontSize: "17px",
                      fontFamily: "monospace",
                    }}
                  >
                    {symbol}
                    {currnetPrice}
                  </span>
                </Typography>
              </Grid>

              <Grid xs={12}>
                <Typography
                  variant="h5"
                  px={2}
                  mb={1}
                  style={{ fontWeight: "bold", fontFamily: "serif" }}
                >
                  Market Cap:{" "}
                  <span
                    style={{
                      fontWeight: "l200",
                      fontSize: "17px",
                      fontFamily: "monospace",
                    }}
                  >
                    {symbol}
                    {marketCap}
                  </span>
                </Typography>
              </Grid>
            </Grid>
            <Grid>
                {
                     whatchlist.includes(id) ?
                     <Button 
                     style={{backgroundColor:"red ",color:"black",marginLeft:15}}
                     variant= "contained"
                     onClick={()=>{
                         const items =whatchlist.filter(item=>item!==coin.id)
                         setWatchList(items)
                         AlertRemove("This coin has been successfully Remove  the watchlist")
                         console.log("watch del ",whatchlist)
                       }}
                     >
                     Remove From WatchList
                     </Button>:
                 

                        <Button 
                        style={{backgroundColor:"yellow ",color:"black",marginLeft:15}}
                        variant= "contained"
                        onClick={()=>{

                            setWatchList([...whatchlist,id])
                            AlertSuccess("This coin has been successfully added to the watchlist ")
                            
                            console.log("watch  add",whatchlist)
                        }}
                            
                        >
                        Add to WhatchList
                        </Button>

                }
                
            </Grid>
           
          </div>
        )}
      </Grid>
      <Grid item xs={12} md={8} lg={8}>
        <CoinInfo coin={id} />
      </Grid>
     <ToastContainer />
    </Grid>
  );
};

export default CoinPage;
