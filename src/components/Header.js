import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext/CryptoContextProvider";
import Sidebar   from './Sidebar'

const useStyles = makeStyles(() => ({
  title: {
    color: "gold",
    fontWeight: "bold",
    cursor: "pointer",
  },
  select: {
    width: "100px",
    height: "40px",
   
  },
  tolbar:{
    display:"flex",
    justifyContent:"space-between",
 
  }
}));
const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    mode: "dark",
  },
});
const Header = () => {
   
  const navigate = useNavigate();
  const classes = useStyles();
  const {currency,setCurrency}=CryptoState();
  console.log(currency);
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar   className={classes.tolbar}>
            <Typography
              onClick={() => navigate("/", { replace: true })}
              className={classes.title}
              variant="h5"
            >
              Snowcrypto
            </Typography>
            <div style={{display:"flex",justifyContent:"space-around"}}>
              <Select
              onChange={(e)=>setCurrency(e.target.value)}
                value={currency}
                variant="outlined"
                className={classes.select}
              >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={'EUR'}> EUR </MenuItem>
              </Select>
              <Sidebar />
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
