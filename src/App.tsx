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
  const [contract, setContract] = useState<any>(null);
  const [totalSupply, setTotalSupply] = useState<number>(0);
  const [kryptoBirdz, setKryptoBirdz] = useState<Array<any>>([]);
  const [inputValue, setInputValue] = useState<string>("")


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
      const networkId = await web3.eth.net.getId();
      const networkData = JSON.parse(JSON.stringify(KryptoBird)).networks[networkId];
      if(networkData){
        const abi = KryptoBird.abi;
        const address = networkData.address;
        const contract = new web3.eth.Contract(abi, address);
        setContract(contract);
        const totalSupply = await contract.methods.totalSupply().call();
        setTotalSupply(totalSupply);
        console.log(totalSupply)

        for(let i=0; i<totalSupply; i++){
          const kryptoBirdItem = await contract.methods.kryptoBirdz(i).call();
          setKryptoBirdz(
            [
              ...kryptoBirdz,
              kryptoBirdItem
            ]
          )
        }
      }

    }catch(err: any){ 
      console.log(err);
    }
  }

  const mint = (bird: any)=>{
    try{
      contract.methods.mint(bird).send({ from: accounts[0]}).once("receipt", ()=>{
        setKryptoBirdz(
          [
            ...kryptoBirdz,
            bird
          ]
        )
      })
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
     <div className="container-fluid mt-1">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto" style={{ opacity: "0.8" }}>
              <h1 style={{color: "white"}}>KryptoBirdz NFT MarketBlace</h1>
              <form onSubmit={(event)=>{
                event.preventDefault();
                console.log(inputValue)
                mint(inputValue);
              }}>
                <input 
                  type={"text"}
                  placeholder="Add a file location"
                  className="form-control mb-1"
                  onChange={(input:any) => setInputValue(input.target.value)}
                />
                <input type="submit" className="btn btn-primary btn-black" value="MINT"/>
              </form>
            </div>
          </main>
        </div>
     </div>
   </div>
  );
}

 
export default App;