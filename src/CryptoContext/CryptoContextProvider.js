import { createContext, useContext, useEffect, useState } from "react";

const crypto =createContext()
const CryoptoContextProvider = ({children}) => {
    const[currency,setCurrency]=useState('USD')
    const[symbol,setSymbol]=useState('$')
    const[whatchlist,setWatchList]=useState([])
    const [coins, setCoins] = useState([]);
    useEffect(()=>{
        if(currency ==='USD') setSymbol('$')
        else if (currency ==='EUR')setSymbol('€')
    },[currency])
    console.log("watch",whatchlist)
    return ( 
        <crypto.Provider value={{symbol,currency,setCurrency,whatchlist,setWatchList,coins,setCoins}}>
            {children}
        </crypto.Provider>

     );
}
 
export default CryoptoContextProvider;
export const CryptoState =()=>{
    return useContext(crypto)
}