import React from "react";
import NftList from "./nftList";

const MyAssets = () => {
  let nfts = [
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
      image:
        "https://live-production.wcms.abc-cdn.net.au/cbe346eee79d3e08dee5e8eb04284438?impolicy=wcms_crop_resize&cropH=1680&cropW=2983&xPos=17&yPos=574&width=862&height=485",
      description: "A Cartoon Art which is unique",
      name: "A Cartoon",
      price: 1,
    },
  ];
  return <NftList filter="my" nfts={nfts} />;
};

export default MyAssets;
