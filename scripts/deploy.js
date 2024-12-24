// scripts/deploy.js
async function main() {
  // Get the ContractFactory and signers
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy the Edexa contract
  const Edexa = await ethers.getContractFactory("Edexa");
  const edexa = await Edexa.deploy();

  console.log("Edexa contract deployed to:", edexa.address);

  // Optionally, mint a token after deployment (if desired)
  // Example: Mint a token to the deployer's address
  const tokenURI = "https://my-metadata-url.com/1"; // Replace with your metadata URL
  await edexa.safeMint(deployer.address, tokenURI);
  console.log("Minted token with URI:", tokenURI);
}

// Run the deploy script
main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  });
