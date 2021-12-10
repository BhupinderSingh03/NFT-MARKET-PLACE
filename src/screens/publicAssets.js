import React from "react";
import NftCreate from "./nftCreate";
import NftList from "./nftList";

const PublicAssets = () => {
  let nfts = [
    {
      image:
        "https://live-production.wcms.abc-cdn.net.au/cbe346eee79d3e08dee5e8eb04284438?impolicy=wcms_crop_resize&cropH=1680&cropW=2983&xPos=17&yPos=574&width=862&height=485",
      description: "A Cartoon Art which is unique",
      name: "A Cartoon",
      price: 1,
    },
    {
      image:
        "https://www.datocms-assets.com/16499/1622710278-image3.png?auto=format&dpr=0.84&fit=max&w=960",
      description: "A Shoe Art which was adorable",
      name: "A Kid Shoe",
      price: 2,
    },
    {
      image: "https://miro.medium.com/max/2000/1*AJrLFnuCAD8dE1p1Bg0dbg.jpeg",
      description: "A wall Art which is unique",
      name: "The Wall",
      price: 3,
    },
    {
      image:
        "https://api.time.com/wp-content/uploads/2021/03/nft-art-1.jpg?quality=85&w=1200&h=628&crop=1",
      description: "Time Magazine What Are NFTs and Why?",
      name: "A Magazine",
      price: 0.44,
    },
    {
      image:
        "https://www.cnet.com/a/img/G6vKiQdvVTqsc8NtYFAa_6Sh5o0=/940x0/2021/03/22/d48c45f6-e4d7-4281-98bb-c6aff252ef98/nmjgg.jpg",
      description: "A Cat Gif",
      name: "A Cat",
      price: 0.44,
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTicEUMEg1agMdE8DqyQBm3CC_JkYFh3wlq7A&usqp=CAU",
      description: "A Pikachu Art with colors",
      name: "A Pikachu",
      price: 0.44,
    },
    {
      image: "https://api.time.com/wp-content/uploads/2021/03/nft-art-6.jpg",
      description: "A globe with universe",
      name: "A Globe",
      price: 0.44,
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRva_70KKgTgx-yeonNwLzMSFjX1Mmounn8OA&usqp=CAU",
      description: "A Pikachu Art with colors",
      name: "A Pikachu",
      price: 0.44,
    },
  ];
  return (
    <>
      <NftCreate />
      <NftList filter="public" nfts={nfts} />
    </>
  );
};

export default PublicAssets;
