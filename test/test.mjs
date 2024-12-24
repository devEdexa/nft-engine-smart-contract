import hardhat from 'hardhat';  
const { ethers } = hardhat;   
import { expect } from 'chai';

describe("Edexa Contract", function () {
  let Edexa;
  let edexa;
  let owner;
  let addr1;
  let addr2;
  let tokenURI;

  beforeEach(async function () {
    // Get the signers (addresses)
    [owner, addr1, addr2] = await ethers.getSigners();

    // Get the contract factory and deploy the contract
    Edexa = await ethers.getContractFactory("Edexa");
    edexa = await Edexa.deploy();

    // Define a token URI for testing
    tokenURI = "https://my-metadata-url.com/1";
  });

  describe("Deployment", function () {
    it("Should deploy the contract and assign the correct owner", async function () {
      expect(await edexa.owner()).to.equal(owner.address);
    });
  });

  describe("Minting", function () {
    it("Should mint a new token to the specified address", async function () {
      await edexa.safeMint(addr1.address, tokenURI);
      const ownerOfToken = await edexa.ownerOf(0); // Token ID 0
      expect(ownerOfToken).to.equal(addr1.address);
    });

    it("Should assign the correct token URI after minting", async function () {
      await edexa.safeMint(addr1.address, tokenURI);
      const uri = await edexa.tokenURI(0); // Token ID 0
      expect(uri).to.equal(tokenURI);
    });

    it("Should revert if trying to mint from a non-owner address", async function () {
      await expect(
        edexa.connect(addr1).safeMint(addr2.address, tokenURI)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("Pausing", function () {
    it("Should pause and unpause the contract correctly", async function () {
      await edexa.pause();
      await expect(edexa.safeMint(addr1.address, tokenURI)).to.be.revertedWith(
        "Pausable: paused"
      );

      await edexa.unpause();
      await expect(edexa.safeMint(addr1.address, tokenURI)).to.not.be.reverted;
    });

    it("Should revert if non-owner tries to pause the contract", async function () {
      await expect(edexa.connect(addr1).pause()).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
    });
  });

  describe("Burning", function () {
    it("Should burn a token correctly", async function () {
      await edexa.safeMint(addr1.address, tokenURI);
      const tokenId = 0; // Token ID 0
      await edexa.connect(addr1).burn(tokenId);
      await expect(edexa.ownerOf(tokenId)).to.be.revertedWith(
        "ERC721: owner query for nonexistent token"
      );
    });

    it("Should revert burning a non-existent token", async function () {
      await expect(edexa.connect(addr1).burn(999)).to.be.revertedWith(
        "ERC721: operator query for nonexistent token"
      );
    });
  });

  describe("Transfers", function () {
    it("Should transfer a token from one address to another", async function () {
      await edexa.safeMint(addr1.address, tokenURI);
      const tokenId = 0;
      await edexa.connect(addr1).transferFrom(addr1.address, addr2.address, tokenId);
      const newOwner = await edexa.ownerOf(tokenId);
      expect(newOwner).to.equal(addr2.address);
    });

    it("Should revert if trying to transfer a token when the contract is paused", async function () {
      await edexa.pause();
      await expect(
        edexa.connect(addr1).transferFrom(addr1.address, addr2.address, 0)
      ).to.be.reverted;
    });
  });
});
