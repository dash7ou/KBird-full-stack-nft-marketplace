import { useEffect,useState  } from "react";
import Web3 from "web3";
import detectedEthereumProvider from "@metamask/detect-provider";
// import  {Provider} from "@ethersproject/abstract-provider";
// import Provider from "@ethersproject/providers";

import KryptoBird from "./abis/KryptoBird.json";

import './App.css';


function App() {
  const [providerApp, setProviderApp]: any = useState(null)

  useEffect(()=>{
    const loadingData = async ()=>{
      await loadWeb3()
      const x = new Web3(providerApp);
      console.log(x)
    } 
    loadingData()
  }, [])

  const loadWeb3 = async (): Promise<any> =>{
    try{
      const provider = await detectedEthereumProvider();
      setProviderApp(provider)

      if(provider){
        console.log("ethereum wallet connected!");

      }else{
        console.log("no ethereum walllet connected!");
      }
    }catch(err: any){

    }
  }

  return (
   <div></div>
  );
}

 
export default App;