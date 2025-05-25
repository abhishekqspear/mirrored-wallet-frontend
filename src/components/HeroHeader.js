import React from "react";
import { useAddress } from "@thirdweb-dev/react";
import { Player } from "@lottiefiles/react-lottie-player";
import walletAnim from "../assets/wallet-anim.json"; // Place Lottie file here
import bannerImage from "../assets/banner-bg.jpg";

const HeroHeader = () => {
  const address = useAddress();

  return (
<div
  className="w-full bg-cover bg-center py-16 px-6 text-white relative"
  style={{
    backgroundImage: `url(${bannerImage})`,
  }}
>
  {/* Dark gradient from 25% height to bottom */}
<div
  className="absolute inset-0 z-0"
  style={{
    background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 25%, rgba(0, 0, 0, 1) 100%)",
  }}
></div>


  <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
    {/* Lottie Icon */}
    <div className="w-32 md:w-40 mb-4">
      <Player
        autoplay
        loop
        src={walletAnim}
        style={{ height: "100%", width: "100%" }}
      />
    </div>

    {/* Title & Subtitle */}
    <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
      Web3 Admin Wallet Dashboard
    </h1>
    <p className="text-lg md:text-xl mt-4 drop-shadow-md">
      Simulate, Preview & Approve Secure Token Transfers
    </p>

    {/* Wallet Status Badge */}
    <div className="mt-6">
      <span
        className={`inline-flex items-center px-4 py-1.5 text-sm font-medium rounded-full ${
          address
            ? "bg-green-600 text-white"
            : "bg-yellow-500 text-black"
        } shadow-lg`}
      >
        {address ? "🔒 Wallet Connected" : "🔓 Wallet Disconnected"}
      </span>
    </div>
  </div>
</div>

  );
};

export default HeroHeader;
