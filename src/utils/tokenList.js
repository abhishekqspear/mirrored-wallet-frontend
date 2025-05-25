import bitcoinLogo from "../assets/btc.png";
import ethLogo from "../assets/eth.png";
import usdtTrc20Logo from "../assets/usdt-trc20.png";
import usdtErc20Logo from "../assets/usdt-erc20.png";
const tokenList = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    logo: bitcoinLogo,
    coingeckoId: "bitcoin"
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    logo: ethLogo,
    coingeckoId: "ethereum"
  },
  {
    name: "USDT (TRC-20)",
    symbol: "USDT-TRC20",
    logo: usdtTrc20Logo,
    coingeckoId: "tether",
  },
  {
    name: "USDT (ERC-20)",
    symbol: "USDT-ERC20",
    logo: usdtErc20Logo,
    coingeckoId: "tether",
  },
];

export default tokenList;
