import { Box, Heading, Stack, StackDivider, Text } from "@chakra-ui/react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <Box ml={5} mt={5}>
      <Heading size="3xl" color="red.500">
        Opps
      </Heading>

      <Stack divider={<StackDivider />} spacing="4">
        <Box mt={7}>
          <Text pt="2" fontSize="xl" color="tomato">
            {isRouteErrorResponse(error)
              ? "Sorry, this page does not exist."
              : "Sorry, an unexpect error has occurred."}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default ErrorPage;
