import { v4 as uuid } from "uuid";

const BannerData = [
  {
    id: uuid(),
    title: "🎉 Get Exciting Offers!",
    bannerImage: "../images/headphone.png",
    details: "Discover exclusive deals that will make you jump for joy.",
  },
  {
    id: uuid(),
    title: "📱 Apple iPhone 15 Pro",
    bannerImage: "../images/iphone.png",
    details: "Unlock extraordinary performance and innovation with the Apple iPhone 15 Pro:",
  },
  {
    id: uuid(),
    title: "💻 MacBook Air - Midnight",
    bannerImage: "../images/mackbook.png",
    details: "Experience power and elegance in the sleek Midnight color of the MacBook Air.",
  },
  {
    id: uuid(),
    title: "👟 Stylish Shoes",
    bannerImage: "../images/shoes.png",
    details: "Step into fashion with our collection of stylish shoes that will elevate your look.",
  },
  {
    id: uuid(),
    title: "🛒 Apna Bazaar",
    bannerImage: "../images/banner2.png",
    details: "Discover a world of convenience and choice at Apna Bazaar.",
  }
];

export default BannerData;
