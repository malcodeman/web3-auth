import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { configureChains, createClient } from "wagmi";
import {
  arbitrum,
  avalanche,
  bsc,
  fantom,
  mainnet,
  optimism,
  polygon,
} from "wagmi/chains";
import { PROJECT_ID } from "lib/constants";

const chains = [mainnet, polygon, optimism, arbitrum, avalanche, fantom, bsc];
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: PROJECT_ID }),
]);
const wagmiClient = createClient({
  autoConnect: false,
  connectors: modalConnectors({
    appName: "web3-auth",
    chains,
  }),
  provider,
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

export { wagmiClient, ethereumClient };
