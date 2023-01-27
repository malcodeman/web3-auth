import { ChakraProvider } from "@chakra-ui/react";
import { WagmiConfig } from "wagmi";
import { wagmiClient } from "lib/ethereumClient";
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <WagmiConfig client={wagmiClient}>
        <Component {...pageProps} />
      </WagmiConfig>
    </ChakraProvider>
  );
}

export default App;
