import React, { useState, useEffect } from 'react';
import { ConnectButton } from '../components/connectButton';
import { Navbar } from '../layout/navbar';
import { getWalletBalance } from '../web3';
import Swal from 'sweetalert2'
import { Loader1 } from "../components/loaders";

import { WalletContext } from '../WalletContext';

export const Claim = () => {
    const { wallet, 
            getValue, 
            connectWallet, 
            claim, 
            balanceOfContract, 
            adminAddress, 
            readBalanceOfTT,
            callContractData 
        } = React.useContext(WalletContext);
    const [walletBalance, setWalletBallance] = useState(0);

    const getAddressStatus = async () => {
        // let balance = await getWalletBalance(getValue("walletAddress"));
        // setWalletBallance(balance);
        if(wallet.walletAddress == null) return
        let accountBalance = await readBalanceOfTT(wallet.walletAddress);
        setWalletBallance(accountBalance);
    }
    const [ownerAddress, setOwnerAddress] = useState("");
    useEffect(() => {
        (async () => {
            connectWallet();
            if (getValue('walletConnected')) {
                await getAddressStatus();
            }
           
        })();
    }, [getValue('walletConnected')]);
    const [loading, setLoading] = useState(false);
   
    const [errMsg, setErrMsg] = useState("");

    const  btnClaim= async () => {
        if ( amountSale === 0 ) {
            setErrMsg("Please input correct number of amount")
            return
        }
        
        if (adminAddress.toLowerCase() != wallet.walletAddress.toLowerCase()){
            setErrMsg("Admin account can only be claimed!")
            return;
        }
        setLoading(true)
        setErrMsg("")
   
        let res = await claim(amountSale);
        if (res) {
            callContractData();
          
            Swal.fire('Successfully claimed');
        } else {
            Swal.fire('Failed to claim');
        }
        setLoading(false);
        await getAddressStatus();
    }
   
    const [amountSale, setAmountSale] = useState(0);
    const validate = (cnt) => {
        if (cnt > balanceOfContract) {
            Swal.fire('Input error');
        } 
    }
    return (
        <>
        <Navbar/>
        <main className="spec1">           
            <div id="banner" style={{
                backgroundImage: "url(/imgs/banner_back.jpg)",
                backgroundSize: "cover",
            }}>
                <div className="bg-white dark:bg-gray-800 bg-opacity-50 lg:h-screen">
                    <div className="lg:container mx-auto flex flex-col h-full items-center justify-center">
                       
                        <div className="flex flex-col lg:flex-row w-full justify-center">
                            <div className="text-start py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20 flex items-center flex-col justify-center">
                                <div className="lg:mt-0 lg:flex-shrink-0">
                                    <div className="inline-flex rounded-md shadow">
                                        <div className="relative rounded-md shadow-sm">
                                            <div style={{
                                                display: 'flex'
                                            }}>
                                                <div className="text-3xl p-1 bg-black text-white" onClick={() => {
                                                    if (amountSale > 0) {
                                                        setAmountSale(oldVal => parseInt(oldVal) - 1);
                                                        setErrMsg(``);
                                                    } else {
                                                        setErrMsg(`Cannot decrease more`);
                                                    }
                                                    getAddressStatus();
                                                }}>-</div>
                                                <input value={amountSale} onChange={e => validate(e.target.value)} name="password" id="password" type="text" className="block pr-10 shadow appearance-none border-2 border-orange-100 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500 transition duration-500 ease-in-out" />
                                                <div className="text-3xl p-1 bg-black text-white" onClick={() => {
                                                    if ((amountSale < balanceOfContract) || getValue("walletAddress").toLowerCase() === ownerAddress.toLowerCase()) {
                                                        setAmountSale(oldVal => parseInt(oldVal) + 1);
                                                        setErrMsg(``);
                                                    } else {
                                                        setErrMsg(`Cannot increase count of token.`);
                                                    }
                                                    getAddressStatus();
                                                }}>+</div>
                                            </div>
                                          
                                        </div>
                                    </div>
                                </div>
                                { !getValue('walletConnected') ? <h5 className="w-full text-center">Connect your wallet</h5> :
                                <>
                                    <h5 className="w-full text-center mt-6"> Balance of Contract: { balanceOfContract } </h5> 
                                    <h5 className="w-full text-center"> Balance of account: { walletBalance } </h5> 
                                </>
                                }
                            </div>
                            <div className="text-start py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20 flex items-center flex-col">
                                <ConnectButton mintCallback={btnClaim} loading={loading}/>
                                { errMsg !== "" ? <p className="w-96 text-center mt-6">{errMsg}</p> : ""}
                            </div>
                        </div>
                    </div>
                </div>
                {loading ? <div className="fixed z-50 left-0 top-0 w-full h-screen"><Loader1 /></div> : ""}
            </div>
        </main>
        </>
    )
}