import { useEffect,useState  } from "react";
import Web3 from "web3";
import detectedEthereumProvider from "@metamask/detect-provider";
// import  {Provider} from "@ethersproject/abstract-provider";
// import Provider from "@ethersproject/providers";

import KryptoBird from "./abis/KryptoBird.json";

import './App.css';


function App() {
  // const [web3, setWeb3]: any = useState(null);
  const [accounts, setAccounts] = useState<Array<string>>([]);

  useEffect(()=>{
    const loadingData = async ()=>{
      const web3 = await loadWeb3()
      await loadBlockchainData(web3)
    }

    loadingData()
  }, [])

  const loadWeb3 = async (): Promise<any> =>{
    try{
      const provider : any = await detectedEthereumProvider();
      const web3 = new Web3(provider);
      // setWeb3(web3);

      if(provider){
        console.log("ethereum wallet connected!");
        return web3
      }else{
        console.log("no ethereum walllet connected!");
      }
    }catch(err: any){ 

    }
  }


  const loadBlockchainData = async (web3: any): Promise<any> => {
    try{
      const accounts  = await web3.eth.getAccounts();
      setAccounts(accounts)
    }catch(err: any){ 
    }
  }

  return (
   <div>
     <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <div className="navbar-brand col-sm-3 col-md-3 mr-0" style={{color: "white"}}>
          Krypto Birdz NFTs (Non Fungible Tokens)
        </div>

        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-block">
            <small className="text-white">
              {accounts[0]}
            </small>
          </li>
        </ul>
     </nav>
   </div>
  );
}

 
export default App;