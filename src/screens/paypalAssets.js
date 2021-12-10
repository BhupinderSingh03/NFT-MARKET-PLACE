import React from "react";
import NftList from "./nftList";

const PaypalAssets = () => {
  let nfts = [
    {
      description: "Q3 Earnings",
      image:
        "https://gateway.pinata.cloud/ipfs/QmYjED7XguRub2ypyUMbzxHGFmye3WtAT5y2sBRZAhaLcw",
      name: "Q3-Earnings",
      price: 1,
    },
    {
      description: "Pay And Venmo",
      image:
        "https://gateway.pinata.cloud/ipfs/QmZuJzNta3NGH5MWJqRY46wfKVhJcw2a5T7XyPntT8BnA6",
      name: "Pay With Venmo",
      price: 4,
    },
    {
      description: "Zettle Launch",
      image:
        "https://gateway.pinata.cloud/ipfs/QmZKaLBXfuE53WqtsQitrcbQcmE6rQPTBxNc8SqRQvSmZs",
      price: 3,
      name: "Zettle Launch",
    },
    {
      description: "Tweet About Crypto",
      image:
        "https://gateway.pinata.cloud/ipfs/QmeVAz6TuVp3feeLxT13QxtiHyLgmTZvYFLcw5wsFQhjGg",
      price: 0.3,
      name: "Tweet About Crypto",
    },
    {
      description: "PayLater",
      image:
        "https://gateway.pinata.cloud/ipfs/QmSpUVwEgSDVuLxG7fbTzmFYRCc7bAGLRXtzpiQZ92SwBS",
      name: "Pay Later",
      price: 0.4,
    },
    {
      description: "Charity",
      image:
        "https://gateway.pinata.cloud/ipfs/Qmb7ZVme5Qpy2LyuMkwLqfp1g9kv4AfzkNyA8h1arzcaWK",
      name: "Charity Donations",
      price: 5,
    },
  ];
  return <NftList filter="paypal" nfts={nfts} />;
};

export default PaypalAssets;
