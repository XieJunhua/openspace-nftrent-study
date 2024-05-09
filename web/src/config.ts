// import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

// import { cookieStorage, createStorage } from "wagmi";
// import { localhost, mainnet, sepolia, foundry } from "wagmi/chains";

import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage } from "wagmi";
import { localhost, mainnet, sepolia, foundry } from "wagmi/chains";
// import { http, createConfig, WagmiProvider } from 'wagmi'


(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

// Get projectId at https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

// 来自于已经部署的 thegraph：
export const RENFT_GRAPHQL_URL = process.env.NEXT_PUBLIC_RENFT_GRAPHQL_URL;

if (!RENFT_GRAPHQL_URL) throw new Error("RENFT_GRAPHQL_URL is not defined");

export const LOADIG_IMG_URL = "/images/loading.svg";
export const DEFAULT_NFT_IMG_URL = "/images/empty_nft.png";

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// Create wagmiConfig
const chains = [mainnet, sepolia, foundry] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  // ...wagmiOptions, // Optional - Override createConfig parameters
});

import { http, createConfig } from "@wagmi/core";
export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, foundry],
  transports: {
    [mainnet.id]: http("https://ethereum-rpc.publicnode.com"),
    // [sepolia.id]: http("https://ethereum-sepolia-rpc.publicnode.com"),
    [sepolia.id]: http("https://sepolia.gateway.tenderly.co"),

    [foundry.id]: http("http://127.0.0.1:8545"),
  },

});

import { type TypedData } from "viem";

// 协议配置 
export const PROTOCOL_CONFIG = {
  [Number(foundry.id)]: {
    domain: {
      name: 'RentMarket',
      version: '1',
      chainId: 31337,
      verifyingContract: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
    },
    rentoutMarket: "0x5FbDB2315678afecb367f032d93F642f64180aa3", // TODO: 配置出租市场合约地址
  },

  [Number(sepolia.id)]: {
    domain: {
      name: 'RentMarket',
      version: '1',
      chainId: sepolia.id,
      verifyingContract: '0xCE15B0E02Fb1915Abd86B1A18B83B3416d65cb51',
    },
    rentoutMarket: "0xCE15B0E02Fb1915Abd86B1A18B83B3416d65cb51", // TODO: 配置出租市场合约地址
  },
} as const;



// EIP-721 签名类型
export const eip721Types = {
  // 出租NFT的挂单信息结构
  RentoutOrder: [
    { name: 'maker', type: 'address' },
    { name: 'nft_ca', type: 'address' },
    { name: 'token_id', type: 'uint256' },
    { name: 'daily_rent', type: 'uint256' },
    { name: 'max_rental_duration', type: 'uint256' },
    { name: 'min_collateral', type: 'uint256' },
    { name: 'list_endtime', type: 'uint256' },
  ],
} as const as TypedData;
