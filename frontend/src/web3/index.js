import Web3 from "web3";
import { OpenSeaNet } from '../config';
import { ABI, contractAddress } from "../config";

import Swal from 'sweetalert2';

if (typeof window.web3 !== 'undefined') {
    window.web3 = new Web3(Web3.givenProvider)
}

(async () => {try {
    const tempNftMintContract = new window.web3.eth.Contract(ABI, contractAddress)
    let cost = await window.web3.utils.fromWei(await tempNftMintContract.methods.cost().call(), 'ether');
} catch(e) {
    console.log(e)
}})()

export const initWeb3Providable = () => {
    if (typeof window.web3 !== 'undefined') {
        // Use existing gateway
        window.web3 = new Web3(window.ethereum);
        return true
    } else {
        // if (window.mobileCheck() === "web") {
            Swal.fire({
                title: 'Metamask Wallet ?',
                text: "No Ethereum interface injected into browser. Read-only access! Please install metamask wallet",
                icon: 'warning',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                denyButtonColor: '#d33',
                cancelButtonColor: '#6e7881',
                confirmButtonText: 'Yes, i will install metamask!',
                cancelButtonText: 'I have installed metamask!'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.open("https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn", "_blank");
                    document.location.reload();
                } else if (result.isDismissed) {
                    document.location.reload();
                }
            })
            return false;
        // } else {
        //     return true;
        // }
    }
}

export const connectMetamaskWallet = async (next) => {
    if (!window.ethereum) {
        return
    }
    window.ethereum.enable()
        .then(function (accounts) {
            window.web3.eth.net.getNetworkType()
            // checks if connected network is mainnet (change this to rinkeby if you wanna test on testnet)
            .then((network) => {
                if(network !== OpenSeaNet.networkName){
                  
                } else {
                    // next(accounts[0])
                }
                
                next(accounts[0]);
            }).catch(function (err) {
                console.log(err)
            });  
    
        })
        .catch(function (error) {
            // Handle error. Likely the user rejected the login
            console.error(error)
        })

        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
                const chainNum = parseInt(chainId, 16);
                if (chainNum !== 0x4){  //  0x4 - rinkeby testnet
                  Swal.fire({
                        title: 'Rinkeby testnet network ?',
                        text: "Should switch rinkeby testnet :)",
                        icon: 'warning',
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: `Yes, i change network to ${OpenSeaNet.networkName}`
                    }).then(async (result) => {
                        try {
                            await window.ethereum.request({method: 'wallet_switchEthereumChain', params: [{ chainId: OpenSeaNet.chainId }]})
                        } catch(e) {

                        } finally {
                            window.location.reload();
                        }
                    })
                }
}

export const getWalletBalance = async (address) => {
    if (!window.web3) {
        return
    }
    if (address !== "") {
        return Number.parseFloat(window.web3.utils.fromWei(await window.web3.eth.getBalance(address), 'ether')).toFixed(6)
    } else {
        return 0
    }
}

