import React from "react";
import { Button, useBoolean } from "@chakra-ui/react";
import { Web3Modal } from "@web3modal/react";
import { useWeb3Modal } from "@web3modal/react";
import { PROJECT_ID } from "lib/constants";
import { ethereumClient } from "lib/ethereumClient";

function WalletConnect() {
  const [isLoading, setIsLoading] = useBoolean();
  const { open } = useWeb3Modal();

  async function handleOnOpen() {
    setIsLoading.on();
    await open();
    setIsLoading.off();
  }

  return (
    <div>
      <Button onClick={handleOnOpen} isLoading={isLoading}>
        WalletConnect
      </Button>
      <Web3Modal projectId={PROJECT_ID} ethereumClient={ethereumClient} />
    </div>
  );
}

export default WalletConnect;
