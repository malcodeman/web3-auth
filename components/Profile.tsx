import { Box, Text } from "@chakra-ui/react";
import { useAccount, useBalance, useNetwork } from "wagmi";
import { Web3NetworkSwitch } from "@web3modal/react";

function Profile() {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { data } = useBalance({
    address,
  });
  return (
    <Box>
      <Text>Chain ID: {chain?.id}</Text>
      <Text>Chain name: {chain?.name}</Text>
      <Text>Balance: {data?.formatted}</Text>
      <Web3NetworkSwitch />
    </Box>
  );
}

export default Profile;
