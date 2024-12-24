# Edexa Contract

## Overview
The **Edexa** contract is an ERC-721 Non-Fungible Token (NFT) smart contract that supports minting, burning, pausing, and unpausing of NFTs. It is built using OpenZeppelin's contracts for ERC721, Pausable, Ownable, and ERC721Burnable functionality.

## Features
- **Minting**: The owner can mint new tokens with custom metadata (URI).
- **Burning**: Tokens can be destroyed (burned) by the owner.
- **Pausable**: The contract can be paused or unpaused, restricting or allowing transfers.
- **Token URI**: Each token has a unique URI for metadata.

## Contract Details
- **Contract Name**: `Edexa`
- **Token Name**: `edeXaNFTEngine`
- **Token Symbol**: `ENFT`


## Features

## Summary of Functions

- **pause()**: Pauses all token transfers (only callable by the owner).
- **unpause()**: Unpauses token transfers (only callable by the owner).
- **safeMint(address to, string memory uri)**: Mints a new token and assigns it to the specified address with the provided URI (only callable by the owner).
- **_beforeTokenTransfer(address from, address to, uint256 tokenId)**: Ensures transfers are paused when the contract is in the paused state.
- **_burn(uint256 tokenId)**: Burns the specified token (override to include both ERC721 and ERC721URIStorage logic).
- **tokenURI(uint256 tokenId)**: Retrieves the metadata URI of a token.


## Testing & Deployment

#### Install Hardhat and Dependencies


    npm install

#### Test

    npx hardhat test



#### Deploy

    npx hardhat run scripts/deploy.js --network <network-name>

You will need to configure the network settings in the hardhat.config.js file if deploying to a testnet.

