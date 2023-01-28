import { Button, Text } from "@chakra-ui/react";
import { useAccount, useBalance, useNetwork } from "wagmi";
import { disconnect } from "@wagmi/core";
import WalletConnect from "components/WalletConnect";
import SendTransaction from "components/SendTransaction";

function Home() {
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();
  const { data } = useBalance({
    address,
  });

  async function handleOnDisconnect() {
    await disconnect();
  }

  return (
    <div>
      <WalletConnect />
      <SendTransaction />
      {isConnected ? "Connected" : "NOT Connected"}
      <Text>Chain ID: {chain?.id}</Text>
      <Text>Chain name: {chain?.name}</Text>
      <Text>Balance: {data?.formatted}</Text>
      <Button onClick={handleOnDisconnect}>Disconnect</Button>
    </div>
  );
}

export default Home;
