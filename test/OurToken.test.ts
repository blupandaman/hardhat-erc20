import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { assert, expect } from "chai";
import { ethers } from "hardhat";
import { OurToken } from "../typechain-types";

describe("OurToken", function () {
  let ourToken: OurToken;
  let deployer: SignerWithAddress;
  let otherAccount: SignerWithAddress;
  const initialSupply = 100;
  const transferAmount = 10;

  beforeEach(async () => {
    // Contracts are deployed using the first signer/account by default
    [deployer, otherAccount] = await ethers.getSigners();

    const ourTokenFactory = await ethers.getContractFactory("OurToken");
    ourToken = await ourTokenFactory.deploy(initialSupply);
  });

  describe("constructor", () => {
    it("should mint with the correct amount", async () => {
      const totalSupply = await ourToken.totalSupply();
      assert.equal(totalSupply.toString(), initialSupply.toString());
    });
  });

  describe("transfer", () => {
    it("should allow the transfer of tokens to an account", async () => {
      const startingBalanceSender = await ourToken.balanceOf(deployer.address);
      const startingBalanceReciever = await ourToken.balanceOf(
        otherAccount.address
      );

      const txResponse = await ourToken.transfer(
        otherAccount.address,
        transferAmount
      );
      await txResponse.wait(1);

      const endingBalanceSender = await ourToken.balanceOf(deployer.address);
      const endingBalanceReciever = await ourToken.balanceOf(
        otherAccount.address
      );

      assert.equal(
        endingBalanceSender.toString(),
        startingBalanceSender.sub(transferAmount).toString()
      );
      assert.equal(
        endingBalanceReciever.toString(),
        startingBalanceReciever.add(transferAmount).toString()
      );
    });
  });
});
