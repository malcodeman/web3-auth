import {
  Box,
  Container,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useAccount } from "wagmi";
import WalletConnect from "components/WalletConnect";
import SendTransaction from "components/SendTransaction";
import Profile from "components/Profile";

function Home() {
  const { isConnected } = useAccount();
  return (
    <Box paddingY="4">
      <Container>
        <Flex alignItems="center" justifyContent="space-between">
          <Text color="#ff4e17">Malconomy</Text>
          <WalletConnect />
        </Flex>
        {isConnected ? (
          <Tabs>
            <TabList>
              <Tab>Profile</Tab>
              <Tab>Send</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Profile />
              </TabPanel>
              <TabPanel>
                <SendTransaction />
              </TabPanel>
            </TabPanels>
          </Tabs>
        ) : (
          <Text textAlign="center">Connect your wallet</Text>
        )}
      </Container>
    </Box>
  );
}

export default Home;
