require("dotenv").config();
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const axios = require("axios");
const contract = require("../artifacts/contracts/nftContract.sol/NFTCONTRACT.json");

const {
  API_URL,
  CONTRACT_ADDRESS,
  PUBLIC_ADDRESS,
  IMG_METADAT_URI,
  IMG_METADATA_LIST_URI,
  PRIVATE_KEY,
} = process.env;
const web3 = createAlchemyWeb3(API_URL);
console.log(JSON.stringify(contract.abi));
const nftContract = new web3.eth.Contract(contract.abi, CONTRACT_ADDRESS);

const mintNFT = async (tokenURI) => {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_ADDRESS, "latest"); //get latest nonce

  //the transaction
  const txnRequest = {
    from: PUBLIC_ADDRESS,
    to: CONTRACT_ADDRESS,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_ADDRESS, tokenURI).encodeABI(),
  };

  const signPromise = web3.eth.accounts.signTransaction(
    txnRequest,
    PRIVATE_KEY
  );

  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            );
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            );
          }
        }
      );
    })
    .catch((err) => {
      console.log(" Promise failed:", err);
    });

  //   txnRequest.data.on("receipt", function (receipt) {
  //     console.log(receipt); // this prints the hex value of the tokenId
  //     // web3.utils.hexToNumber();
  //   });
};

// mintNFT(`${IMG_METADATA_LIST_URI}1.json`);

const getTokenURI = async () => {
  //   nftContract.tokenURI(0);
  //   web3.eth
  //     .getTransactionReceipt(
  //       "0x44801f8af87e792d97cd4518db15c7b9de143a36934a465c4095f889fbc8969f"
  //     )
  //     .then(async (data) => {
  //       let transaction = data;
  //       let logs = data.logs;
  //       //   console.log("data", logs);
  //       console.log(web3.utils.hexToNumber(logs[0].topics[3]));
  //       console.log("=======>", meta);
  //     });
  try {
    let token = await nftContract.methods.tokenURI(1).encodeABI();
    // let URI = await nftContract.methods._baseURI().encodeABI();
    // const meta = await axios.get(token);
    console.log("=======>", token);
  } catch (err) {
    console.log("=======>err", err);
  }
};

getTokenURI();
