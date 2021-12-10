/* pages/index.js */
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import NFT from "../artifacts/contracts/nft.sol/NFT.json";
import Market from "../artifacts/contracts/marketPlace.sol/NFTMarket.json";
import CONFIG_CONSTANTS from "../constants/configConstants";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import SendIcon from "@mui/icons-material/Send";

const NftList = ({ filter }) => {
  let [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  let { NFT_CONTRACT_ADDRESS, MARKET_ADDRESS } = CONFIG_CONSTANTS;
  console.log();

  useEffect(() => {
    loadNFTs();
    setInterval(() => {
      loadNFTs();
    }, 5000);
  }, []);

  async function loadNFTs() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const marketContract = new ethers.Contract(
      MARKET_ADDRESS,
      Market.abi,
      signer
    );
    const nftContract = new ethers.Contract(
      NFT_CONTRACT_ADDRESS,
      NFT.abi,
      provider
    );
    const data = await marketContract.fetchMarketItems();
    console.log(data);

    /*
     *  map over items returned from smart contract and format
     *  them as well as fetch their token metadata
     */
    if (data[0]) {
      const items = await Promise.all(
        data.map(async (i) => {
          const tokenUri = await nftContract.tokenURI(i.tokenId);
          const meta = await axios.get(tokenUri);
          let price = ethers.utils.formatUnits(i.price.toString(), "ether");
          let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.data.image,
            name: meta.data.name,
            description: meta.data.description,
          };
          return item;
        })
      );
      setNfts(items);
    }
    setLoadingState("loaded");
  }

  async function buyNft(nft) {
    //   /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    //   const web3Modal = new Web3Modal();
    //   const connection = await web3Modal.connect();
    //   const provider = new ethers.providers.Web3Provider(connection);
    //   const signer = provider.getSigner();
    //   const contract = new ethers.Contract(MARKET_ADDRESS, Market.abi, signer);
    //   /* user will be prompted to pay the asking proces to complete the transaction */
    //   const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    //   const transaction = await contract.createMarketSale(
    //     NFT_CONTRACT_ADDRESS,
    //     nft.tokenId,
    //     {
    //       value: price,
    //     }
    //   );
    //   await transaction.wait();
    //   loadNFTs();
  }

  let filteredToken = filter == "paypal" ? 2 : 0;

  if (loadingState === "loaded" && !nfts.length)
    return <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography gutterBottom variant="h6" component="h3">
        {filter.toUpperCase()} ASSETS
      </Typography>
      <Grid container spacing={5} mt={1}>
        {nfts.map((nft, i) => {
          if (nft) {
            return (
              <Grid item xs={3} key={i}>
                <Card sx={{ maxWidth: 345, backgroundColor: "antiquewhite" }}>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image={nft.image}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {nft.name} {nft.price} ETH
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {nft.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {filter == "my" ? (
                      <Button size="small" endIcon={<SendIcon />}>
                        Transfer
                      </Button>
                    ) : (
                      <Button size="small" onClick={() => buyNft(nft)}>
                        Buy
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            );
          }
        })}
      </Grid>
    </Box>
  );
};

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default NftList;
