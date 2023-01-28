import React from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from "wagmi";
import { utils } from "ethers";
import { useDebouncedState } from "@react-hookz/web";

const defaultValues = {
  recipient: "",
  amount: "",
};
const schema = yup
  .object({
    recipient: yup.string().required("Recipient is required!"),
    amount: yup.string().required("Amount is required!"),
  })
  .required();

function SendTransaction() {
  const form = useForm({ defaultValues, resolver: yupResolver(schema) });
  const [debouncedRecipient, setDebouncedRecipient] = useDebouncedState(
    "",
    300,
    500
  );
  const [debouncedAmount, setDebouncedAmount] = useDebouncedState("", 300, 500);
  const prepareSendTransaction = usePrepareSendTransaction({
    request: {
      to: debouncedRecipient,
      value: debouncedAmount ? utils.parseEther(debouncedAmount) : undefined,
    },
  });
  const sendTransaction = useSendTransaction(prepareSendTransaction.config);
  const waitForTransaction = useWaitForTransaction({
    hash: sendTransaction.data?.hash,
  });
  const toast = useToast();

  function handleOnSubmit() {
    sendTransaction.sendTransaction?.();
  }

  React.useEffect(() => {
    if (prepareSendTransaction.isError) {
      toast({
        title: prepareSendTransaction.error?.message,
        status: "error",
        isClosable: true,
      });
    }
  }, [
    prepareSendTransaction.error?.message,
    prepareSendTransaction.isError,
    toast,
  ]);

  React.useEffect(() => {
    if (sendTransaction.isError) {
      toast({
        title: sendTransaction.error?.message,
        status: "error",
        isClosable: true,
      });
    }
  }, [sendTransaction.error?.message, sendTransaction.isError, toast]);

  React.useEffect(() => {
    if (waitForTransaction.isError) {
      toast({
        title: waitForTransaction.error?.message,
        status: "error",
        isClosable: true,
      });
    }
  }, [waitForTransaction.error?.message, waitForTransaction.isError, toast]);

  React.useEffect(() => {
    if (waitForTransaction.isSuccess) {
      toast({
        title: `Successfully sent ${debouncedAmount} ether to ${debouncedRecipient}`,
        status: "success",
        isClosable: true,
      });
    }
  }, [
    waitForTransaction.isSuccess,
    toast,
    debouncedAmount,
    debouncedRecipient,
  ]);

  return (
    <form onSubmit={form.handleSubmit(handleOnSubmit)}>
      <FormControl mb="2" isInvalid={Boolean(form.formState.errors.recipient)}>
        <FormLabel>Recipient</FormLabel>
        <Input
          {...form.register("recipient")}
          onChange={(e) => setDebouncedRecipient(e.currentTarget.value)}
        />
        <FormErrorMessage>
          {form.formState.errors.recipient?.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl mb="2" isInvalid={Boolean(form.formState.errors.amount)}>
        <FormLabel>Amount</FormLabel>
        <Input
          {...form.register("amount")}
          onChange={(e) => setDebouncedAmount(e.currentTarget.value)}
        />
        <FormErrorMessage>
          {form.formState.errors.amount?.message}
        </FormErrorMessage>
      </FormControl>
      <Button
        type="submit"
        width="full"
        isLoading={waitForTransaction.isLoading}
        isDisabled={!sendTransaction.sendTransaction}
      >
        Send
      </Button>
    </form>
  );
}

export default SendTransaction;
