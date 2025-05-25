// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
// import "./index.css";

// ReactDOM.render(<App />, document.getElementById("root"));


// index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { ConnectWallet } from "@thirdweb-dev/react";

import { ThirdwebProvider, metamaskWallet, coinbaseWallet, walletConnect,  trustWallet, rainbowWallet, safeWallet, } from "@thirdweb-dev/react";

// Choose your blockchain (e.g., Ethereum mainnet, Polygon, etc.)
const activeChain = "ethereum";

ReactDOM.render(
  <ThirdwebProvider
    activeChain={activeChain}
    supportedWallets={[
      metamaskWallet(),
      coinbaseWallet(),
      walletConnect(),
      trustWallet(),
      rainbowWallet(),
      safeWallet(),

    ]}
    sdkOptions={{
    telemetry: false, // ✅ disables c.thirdweb.com calls
  }}
  >
    <App />
  </ThirdwebProvider>,
  document.getElementById("root")
);
