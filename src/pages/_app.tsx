import { ChakraProvider } from "@chakra-ui/react";
import { WagmiConfig } from "wagmi";
import { wagmiClient } from "lib/ethereumClient";
import type { AppProps } from "next/app";

if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
}

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
