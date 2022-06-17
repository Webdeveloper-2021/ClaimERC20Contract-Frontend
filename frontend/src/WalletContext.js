import React, { useEffect, useState } from 'react';
import { connectMetamaskWallet, getWhiteListed } from './web3';

import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";

import {contractAddress, ABI} from "./config.js"

export const WalletContext = React.createContext({});

const WalletContextProvider = ({children}) => {
    const [wallet, setWallet] = useState({
        walletConnected: false,
        walletAddress: "",
    })
    const [ownerAddress, setOwnerAddress] = useState("")
    
    // FOR MINTING
    const [TestContract, setTestContract] = useState(null)
    const [mintResult, setMintResult] = useState(false)
    const [mintStart, setMintStart] = useState(false)

    // INFO FROM SMART Contract
    const [adminAddress, setAdminAddress] = useState(0);
    const [tokenName, setTokenName] = useState('');
    const [tokenSymbol, setTokenSymbol] = useState('');
    const [currentTokenCount, setCurrentTokenCount] = useState(0);
    const [balanceOfContract, setBalanceOfContract] = useState(0);


    const getValue = (key, defaultValue = '') => {
        const { [key]: value = defaultValue } = wallet;
        return value;
    };
    const update = (name, value) => {
        setWallet({ ...wallet, [name]: value });
    };
    const connectWallet = () => connectMetamaskWallet(async (address) => {
        setWallet({
            ...wallet,
            'walletConnected': true,
            'walletAddress': address
        });

        callContractData();
    })

    
  async function callContractData() {
    const myTestContract = new window.web3.eth.Contract(ABI, contractAddress)
    setTestContract(myTestContract)
        
    const Supply_contract = await myTestContract.methods.SUPPLY_CONTRACT().call() 
    console.log("===Supply_contract===", Supply_contract)
    
    const adminAddr = await myTestContract.methods.ADMIN_ADDRESS().call() 
    setAdminAddress(adminAddr);
    console.log("===Supply_contract===", Supply_contract)

    const name = await myTestContract.methods.name().call() 
    setTokenName(name)
    
    const symbol = await myTestContract.methods.symbol().call() 
    setTokenSymbol(symbol)
    
    const owner = await myTestContract.methods.owner().call() 
    setOwnerAddress(owner.toLowerCase())

    const tmpBalanceTTOfContract = await myTestContract.methods.balanceOf(contractAddress).call();
    const balanceTTOfContract = Web3.utils.fromWei(tmpBalanceTTOfContract.toString(), "ether");
    console.log('balanceTTOfContract: ', balanceTTOfContract );

    setBalanceOfContract(balanceTTOfContract);
  }

  async function readBalanceOfTT(account){
    if(account == null) return
    const tmpBalanceOfTT = await TestContract.methods.balanceOf(account).call();
    const balanceOfTT = Web3.utils.fromWei(tmpBalanceOfTT.toString(), "ether");
    return balanceOfTT;
  }

  async function claim(amount){
    let amountWei = Web3.utils.toWei(`${ amount }`, 'ether');
   
    let gasFee = await TestContract.methods.claim(amountWei).estimateGas({
                    from: `${ wallet.walletAddress }`, 
                    value: 0,
                });
    let res = await TestContract.methods.claim(amountWei).send(
                    {   
                        from: `${ wallet.walletAddress }`, 
                        value: 0, 
                        gas: gasFee
                    });
    
    return res;
  }

    return (
        <WalletContext.Provider
            value={{
                wallet,
                getValue,
                update,
                connectWallet,
                ownerAddress,
                setOwnerAddress,
                readBalanceOfTT,
                claim,
                balanceOfContract,
                adminAddress,
                callContractData

                
            }}
        >
        {children}
        </WalletContext.Provider>
    )
}

export default WalletContextProvider;