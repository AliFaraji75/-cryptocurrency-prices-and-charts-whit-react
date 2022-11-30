import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./Pages/HomePage";
import CoinPage from "./Pages/CoinPage";
import { makeStyles } from "@mui/styles";

const App = () => {
 
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "#14161a",
      minHeight: "100vh",
      color: "white",
    },
  }));
  const classes = useStyles();
  return (
    
    <BrowserRouter>
      <div className={classes.App}>
      <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  
  );
};

export default App;
