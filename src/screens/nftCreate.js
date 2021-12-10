import { useState } from "react";
import { ethers } from "ethers";
// import { create as ipfsHttpClient } from "ipfs-http-client";
// import { useRouter } from "next/router";
import Web3Modal from "web3modal";
// const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");
import NFT from "../artifacts/contracts/nft.sol/NFT.json";
import Market from "../artifacts/contracts/marketPlace.sol/NFTMarket.json";
import CONFIG_CONSTANTS from "../constants/configConstants";
import LoadingButton from "@mui/lab/LoadingButton";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

const NftCreate = () => {
  const [loading, setLoading] = useState(false);
  let [state, setState] = useState({});
  const handleClick = () => {
    setLoading(true);
    createMarket();
  };
  let { NFT_CONTRACT_ADDRESS, MARKET_ADDRESS, PRIVATE_KEY, PUBLIC_ADDRESS } =
    CONFIG_CONSTANTS;
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: "",
  });
  //   const router = useRouter();

  async function onChange(e) {
    const file = e.target.files[0];
    // try {
    //   const added = await client.add(file, {
    //     progress: (prog) => console.log(`received: ${prog}`),
    //   });
    //   const url = `https://ipfs.infura.io/ipfs/${added.path}`;
    //   setFileUrl(url);
    // } catch (error) {
    //   console.log("Error uploading file: ", error);
    // }
  }
  async function createMarket() {
    const { name, description, price } = formInput;
    // if (!name || !description || !price || !fileUrl) return;
    /* first, upload to IPFS */
    // const data = JSON.stringify({
    //   name,
    //   description,
    //   image: fileUrl,
    // });
    try {
      //   const added = await client.add(data);
      // const url = `https://gateway.pinata.cloud/ipfs/QmV8p8KGc9UWJoVmUzbuWrTgLqSYRKLYhQ5TFnMdr8Rnis/1.json`;
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      const url = state.image_uri;
      createSale(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function createSale(url) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getUncheckedSigner(PUBLIC_ADDRESS);

    /* next, create the item */
    let contract = new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT.abi, signer);
    let transaction = await contract.createToken(url);
    let tx = await transaction.wait();
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();
    const price = ethers.utils.parseUnits("1", "ether");

    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(MARKET_ADDRESS, Market.abi, signer);
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();
    console.log("listingPrice");

    transaction = await contract.createMarketItem(
      NFT_CONTRACT_ADDRESS,
      tokenId,
      price,
      {
        value: listingPrice,
      }
    );
    await transaction.wait();
    setLoading(false);
    setState((prevState) => ({
      ...prevState,
      image_uri: "",
    }));
  }

  const onFormChange = (event) => {
    event.persist();
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Grid container spacing={5} mt={1}>
      <TextField
        id="outlined-basic"
        label="Upload your image here"
        variant="outlined"
        size="small"
        name="image_uri"
        onChange={onFormChange}
        className="create-asset-input"
      />
      <LoadingButton
        className="create-asset"
        onClick={handleClick}
        loading={loading}
        loadingIndicator="Loading..."
        variant="outlined"
      >
        Create Your Digital Asset
      </LoadingButton>
    </Grid>
  );
};

export default NftCreate;
