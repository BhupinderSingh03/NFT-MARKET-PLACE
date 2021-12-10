async function main() {
  /* deploy the marketplace */
  const Market = await ethers.getContractFactory("NFTMarket");
  const market = await Market.deploy();
  await market.deployed();
  const marketAddress = market.address;
  console.log("marketAddress", marketAddress);

  /* deploy the NFT contract */
  const NFT = await ethers.getContractFactory("NFT");
  const nft = await NFT.deploy(marketAddress);
  await nft.deployed();
  const nftContractAddress = nft.address;
  console.log("nftContractAddress", nftContractAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
