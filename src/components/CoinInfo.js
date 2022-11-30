import axios from "axios";
import { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext/CryptoContextProvider";
import { HistoricalChart } from "../Config/api";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CircularProgress, Grid } from "@mui/material";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { chartDays } from "../Config/ChartDays";
import { CategoryScale } from "chart.js";
import Button from "@mui/material/Button";
Chart.register(CategoryScale);

const CoinInfo = (props) => {
  const [historicData, setHistoricData] = useState([]);
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();

  console.log("dataaaaa", historicData);

  useEffect(() => {
    const fetchHistoricData = async () => {
      const id = props.coin;
      const { data } = await axios.get(
        HistoricalChart(props.coin, days, currency)
      );
      setHistoricData(data.prices);
      console.log("data", data.prices);
      console.log("coin", props.coin);
    };
    fetchHistoricData();
  }, [currency, days]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      {historicData.length > 0 ? (
        <div style={{padding:1}}>
        <Line
        
          data={{
            labels: historicData?.map((coin) => {
              let data = new Date(coin[0]);
              let time =
                data.getHours() > 12
                  ? `${data.getHours() - 12}:${data.getMinutes()} PM`
                  : `${data.getHours()}:${data.getMinutes()} AM`;
              return days == 1 ? time : data.toLocaleDateString();
            }),
            datasets: [
              {
                data: historicData?.map((coin) => coin[1]),
                label: `Price (Past ${days} Days) in ${currency}`,
                borderColor: "#EEBC1D",
              },
            ],
          }}
          options={{
            elements: {
              point: {
                radius: 1,
              },
            },
          }}
        />

      <Grid container spacing={1} sx={{textAlign:"center",marginTop:8}}>
        {chartDays.map((day) => (
        <Grid s={3} xs={3} lg={3} md={3}> 
            <Button 
            style={{backgroundColor:days==day.value ?"#2ECC71 ":"yellow "}}
            variant= "contained"
            onClick={()=>setDays(day.value)}
            >
            {day.label}
            </Button>
         </Grid>

        ))}
      </Grid>
        </div>
      ) : (<div style={{height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>

        <CircularProgress sx={{ color: "gold"}}size={250} thickness={1} />
      </div>
      )}

      
    
    </ThemeProvider>
  );
};

export default CoinInfo;
