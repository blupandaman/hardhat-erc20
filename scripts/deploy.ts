import { ethers } from "hardhat";

async function main() {
  const initialSupply = 100;

  const ourTokenFactory = await ethers.getContractFactory("OurToken");
  const ourToken = await ourTokenFactory.deploy(initialSupply);

  await ourToken.deployed();

  console.log(
    `OurToken minted with a supply of ${await ourToken.totalSupply()} deployed to ${
      ourToken.address
    }`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
