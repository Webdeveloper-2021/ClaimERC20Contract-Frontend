const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const testToken = await hre.ethers.getContractFactory("TestToken");
  const testContract = await testToken.deploy();

  await testContract.deployed();

  console.log("Test contract deployed to:", testContract.address);

  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
