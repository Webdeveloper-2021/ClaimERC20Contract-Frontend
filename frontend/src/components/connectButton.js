import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { WalletContext } from '../WalletContext';
import Swal from 'sweetalert2';
import { initWeb3Providable } from '../web3';
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";

const walletConnectUri = {
    "android": "wc:9e56fcb1-5355-4fb1-82c2-27f0fb5a4995@1?bridge=https%3A%2F%2F9.bridge.walletconnect.org&key=ee75e8d18ec5970b1d47d0d9817df20b",
    "ios": ""
}

export const ConnectButton = ({ mintCallback = () => {}, loading}) => {
    const { getValue, connectWallet, ownerAddress } = React.useContext(WalletContext);
    const history = useHistory();
    const Claim = () => {
        if (window.location.pathname.startsWith('/claim')) {
            mintCallback();
        } else {
            history.push("/claim")
        }
    }
    const selfConnectWallet = () => {
        // console.log("platform", window.mobileCheck())
        // if (window.mobileCheck() === "web") {
            let possible = initWeb3Providable();
            if (possible) {
                connectWallet();
            } else {
                setWeb3Possible(possible);
            }
        // } else {
        //     WalletConnectQRCodeModal.open(walletConnectUri.android)   
        // }
    }
    const [web3Possible, setWeb3Possible] = useState(true);
    const gotoMetamaskIntall = () => {
        window.open("https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn", "_blank");
        document.location.reload();
    }
    
    return (
        <>
        <div className="lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex">
                {
                    !getValue('walletConnected') ? 
                    (web3Possible ? 
                    <button onClick={selfConnectWallet} type="button" 
                        className="bg-black hover:bg-white transition-all border-black border-2 duration-500 text-white hover:text-black font-semibold px-6 py-3 rounded-sm"
                    >
                        Connect Wallet
                    </button> : <button onClick={gotoMetamaskIntall} type="button" 
                        className="bg-black hover:bg-white transition-all border-black border-2 duration-500 text-white hover:text-black font-semibold px-6 py-3 rounded-sm"
                    >
                        Install Wallet
                    </button>) :
                    <button onClick={Claim} type="button" 
                        className="bg-black hover:bg-white transition-all border-black border-2 duration-500 text-white hover:text-black font-semibold px-6 py-3 rounded-sm"
                    >
                        Claim
                    </button> 
                }
            </div>
        </div>
        
        </>
    )
}