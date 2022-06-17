const { expect } = require("chai");
const { ethers } = require("hardhat");
const utils = require("ethers/lib/utils");

const gasFee = ethers.utils.parseUnits("80", "gwei");
const gasLimit = 8000000;

describe("Deploying a Contract and test its functionalities ", function () {

  it("Should instantiate the created test contract and call its functions", async () => {
    const [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();
    
    // first contract deployment 
    const TestToken = await ethers.getContractFactory("TestToken");
    
    const gasPrice = await TestToken.signer.getGasPrice();
    console.log(`Current gas price: ${gasPrice}`);

    const estimatedGas = await TestToken.signer.estimateGas(
      TestToken.getDeployTransaction(),
    );
    console.log(`Estimated gas: ${estimatedGas}`);

    const deploymentPrice = gasPrice.mul(estimatedGas);
    const deployerBalance = await TestToken.signer.getBalance();
    console.log(`Deployer balance:  ${ethers.utils.formatEther(deployerBalance)}`);
    console.log(`Deployment price:  ${ethers.utils.formatEther(deploymentPrice)}`);
    if (deployerBalance.lt(deploymentPrice)) {
      throw new Error(
        `Insufficient funds. Top up your account balance by ${ethers.utils.formatEther(
          deploymentPrice.sub(deployerBalance),
        )}`,
      );
    }

    const TestTokenContract = await TestToken.deploy();

    await TestTokenContract.deployed();

    console.log("TestToken deployed to:", TestTokenContract.address);

    console.log("\n")
    console.log('owner address : ', owner.address);
    console.log("\n")

    // await firstContract.connect(addr1).mintTo({
    //   gasPrice,
    //   gasLimit,
    //   value: ethers.utils.parseEther(
    //     salesPrice.toFixed(2).toString()
    //   )
    // });

    let balanceOfContract = await TestTokenContract.connect(addr2).balanceOf(TestTokenContract.address);

    const adminAddr = await TestTokenContract.connect(addr1).ADMIN_ADDRESS();
    const userAddr1 = await TestTokenContract.connect(addr1).USER_ADDRESS1();
    const userAddr2 = await TestTokenContract.connect(addr1).USER_ADDRESS2();
    const userAddr3 = await TestTokenContract.connect(addr1).USER_ADDRESS3();
    const userAddr4 = await TestTokenContract.connect(addr1).USER_ADDRESS4();

    console.log('admin address : ', adminAddr);
    console.log('user address1 : ', userAddr1);
    console.log('user address2 : ', userAddr2);
    console.log('user address3 : ', userAddr3);
    console.log('user address4 : ', userAddr4);
    
    let balanceOfAdmin = await TestTokenContract.connect(addr2).balanceOf(adminAddr);
    let balanceOfAddress1 = await TestTokenContract.connect(addr2).balanceOf(userAddr1);
    let balanceOfAddress2 = await TestTokenContract.connect(addr2).balanceOf(userAddr2);
    let balanceOfAddress3 = await TestTokenContract.connect(addr2).balanceOf(userAddr3);
    let balanceOfAddress4 = await TestTokenContract.connect(addr2).balanceOf(userAddr4);
    
    console.log('testToken balance of contract :', ethers.utils.formatEther(balanceOfContract));
    console.log('testToken balance of admin :', ethers.utils.formatEther(balanceOfAdmin));
    console.log('testToken balance of user1 :', ethers.utils.formatEther(balanceOfAddress1));
    console.log('testToken balance of user2 :', ethers.utils.formatEther(balanceOfAddress2));
    console.log('testToken balance of user3 :', ethers.utils.formatEther(balanceOfAddress3));
    console.log('testToken balance of user4 :', ethers.utils.formatEther(balanceOfAddress4));

    console.log('==================== transfer test ========================');

    await TestTokenContract.connect(addr2).transfer(userAddr1, ethers.utils.parseUnits('200'));
    balanceOfAddress1 = await TestTokenContract.connect(addr2).balanceOf(userAddr1);
    console.log('after transfer, testToken balance of user1 :', ethers.utils.formatEther(balanceOfAddress1));

    console.log('============================= claim =====================');
    await TestTokenContract.connect(owner).claim(ethers.utils.parseUnits('200'));
    
    balanceOfContract = await TestTokenContract.connect(owner).balanceOf(TestTokenContract.address);
    balanceOfAdmin = await TestTokenContract.connect(owner).balanceOf(owner.address);
    console.log('after claim 200, testToken balance of admin :', ethers.utils.formatEther(balanceOfAdmin));
    console.log('after claim 200, testToken balance of contract :', ethers.utils.formatEther(balanceOfContract));


  })

});