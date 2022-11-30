import axios from "axios";
import { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext/CryptoContextProvider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CoinList } from "../Config/api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  Pagination,
  LinearProgress,
  Box,
} from "@mui/material";
import { Container } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

const useStyle = makeStyles(() => ({
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
  },
}));
const CoinTable = () => {
 
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { currency, symbol,setCoins,coins } = CryptoState();
  const [page, setPage] = useState(1);
  const classes = useStyle();
  const navigate = useNavigate();
  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  const filteredCoins = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });
  console.log(coins);
  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography variant="h4" style={{ margin: 20 }}>
          Cryptocurrency Prices by Market Cap
        </Typography>

        <TextField
          label="Search For aCryptocurrency..."
          variant="outlined"
          style={{ marginTop: 10, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        {loading ? (
          <Box
            style={{
              marginTop: "15px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <LinearProgress
              sx={{ width: "80%", color: "gold", backgroundColor: "gold" }}
            />
          </Box>
        ) : (
          <TableContainer style={{ marginTop: 20 }} component={Paper}>
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24 Change", "Market Cpp"].map((head) => (
                    <TableCell
                      style={{ color: "black", fontWeight: 700 }}
                      align={head === "Coin" ? "" : "right"}
                      key={head}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredCoins()
                  .slice((page - 1) * 20, (page - 1) * 20 + 20)
                  .map((item) => {
                    let profit = item.market_cap_change_percentage_24h;
                    return (
                      <TableRow
                        key={item.id}
                        className={classes.row}
                        onClick={() => navigate(`/coins/${item.id}`)}
                      >
                        <TableCell component="th" scope="row" align="left">
                          {
                            <div style={{ display: "flex" }}>
                              <img src={item.image} style={{ width: 30 }} />
                              <div style={{ marginLeft: 10 }}>
                                <p style={{ fontWeight: 700 }}>
                                  {item.symbol.toUpperCase()}
                                </p>
                                <p style={{ fontSize: 11, color: "darkgrey" }}>
                                  {" "}
                                  {item.name}
                                </p>
                              </div>
                            </div>
                          }
                        </TableCell>
                        <TableCell align="right">
                          {symbol} {item.current_price.toLocaleString()}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{ color: profit > 0 ? "green" : "red" }}
                        >
                          {profit > 0 ? "+" : ""}
                          {profit.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol}
                          {item.market_cap.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Pagination
          className={classes.pagination}
          sx={{
            display: "flex",
            justifyContent: "center",
            pading: 10,
            "& .MuiPaginationItem-root": { color: "gold" },
            marginTop: 3,
          }}
          count={(filteredCoins().length / 20).toFixed(0)}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinTable;
