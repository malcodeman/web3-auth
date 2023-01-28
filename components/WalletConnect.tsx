import { Box, Button, useBoolean } from "@chakra-ui/react";
import { Web3Modal } from "@web3modal/react";
import { useWeb3Modal } from "@web3modal/react";
import { disconnect } from "@wagmi/core";
import { useAccount } from "wagmi";
import { FcLock, FcUnlock } from "react-icons/fc";
import { PROJECT_ID } from "lib/constants";
import { ethereumClient } from "lib/ethereumClient";

function WalletConnect() {
  const [isLoading, setIsLoading] = useBoolean();
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();

  async function handleOnDisconnect() {
    await disconnect();
  }

  async function handleOnConnect() {
    setIsLoading.on();
    await open();
    setIsLoading.off();
  }

  return (
    <Box>
      {isConnected ? (
        <Button leftIcon={<FcLock />} size="sm" onClick={handleOnDisconnect}>
          Disconnect
        </Button>
      ) : (
        <Button
          leftIcon={<FcUnlock />}
          size="sm"
          onClick={handleOnConnect}
          isLoading={isLoading}
        >
          Connect
        </Button>
      )}
      <Web3Modal projectId={PROJECT_ID} ethereumClient={ethereumClient} />
    </Box>
  );
}

export default WalletConnect;
