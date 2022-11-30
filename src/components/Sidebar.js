import {useEffect, useState}from 'react';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import { Box } from '@mui/system';
import PersonIcon from '@mui/icons-material/Person';
import { CryptoState } from '../CryptoContext/CryptoContextProvider';
import DeleteIcon from '@mui/icons-material/Delete';
import Badge from '@mui/material/Badge'
import {AlertRemove} from '../components/Alert'
export default function Sidebar() {
 
  const [state, setState] = useState({right: false });
  const { whatchlist ,setWatchList ,symbol,coins} = CryptoState();

  const toggleDrawer = (anchor, open) => (event) => {
       setState({ [anchor]: open });
  };


  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
        <div >
             <div  style={{margin:"0 auto",textAlign:"center",marginTop:"15px"}}>
                <PersonIcon color="action"  sx={{ fontSize:150,backgroundColor:"gold",borderRadius:"50%",color:"gray" }}/>
              <div style={{marginTop:"15px",fontFamily:"serif",textAlign:"center",fontSize:"28px"}}>Ali  Faraji</div>
             </div>
             <div>
                <div 
                 style={{
                    marginTop:"10px",fontFamily:"unset",
                    textAlign:"center",overflowY:"scroll"
                    ,backgroundColor:"#909497   ",height:"300px",
                     padding:3,marginRight:"15px",marginLeft:"15px",
                    borderRadius:10}}
                      >
                     {
                        coins.map(coin=> {
                        if(whatchlist.includes(coin.id))
                     return(
                        <div
                        style={{backgroundColor:"gold",padding:"6px",borderRadius:"4px",
                        margin:5,color:"#212F3C",fontFamily:"serif",display:"flex",
                        justifyContent:"space-between",fontSize:12,border:"1px solid #2C3E50 ",alignItems:"baseline"}}>
                           <p>{coin.id}</p>
                           <p> 
                               <span>{symbol}{coin.current_price.toLocaleString()}</span> 
                               <DeleteIcon 
                               sx={{fontSize:"small",marginLeft:"5px"}} 
                               onClick={()=>{
                                const items =whatchlist.filter(item=>item !==coin.id)
                               setWatchList(items)
                               AlertRemove("This coin has been successfully Remove  the watchlist")
                              console.log("watch del ",whatchlist)
                             }}
                               />
                                </p>
                       </div>
                         )  })
                        
                     }
                </div>
            </div>
        </div>
        </Box> )

  return (
    <div>
     
     {['right'].map((anchor) => (
        <div key={anchor}>
            <Badge
             color="success"
              badgeContent={whatchlist.length}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              overlap="circular"
              showZero
              >
        <Avatar 
        onClick={toggleDrawer(anchor, true)}
         sx={{ bgcolor: "gold", width:40, height: 40,marginLeft:"10px" }}
         
         >A</Avatar>
    
      </Badge>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            
          >
             {list('right')}
          </Drawer>
        </div>
      ))}
     
    </div>
  );
}
