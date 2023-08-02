/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { Box, Heading, Container, Text, Button, Stack } from "@chakra-ui/react";

export const Hero = () => {
  return (
    <>
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Welcome to the <br />
            <Text as={"span"} color={"blue.400"}>
              User dashboard
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            The GEO Knowledge Hub User dashboard is where you can centralize
            information about the users of your applications. Doing this allows
            you to manage this data efficiently and never lose contact points
            again!
          </Text>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Button
              colorScheme={"blue"}
              bg={"blue.400"}
              rounded={"full"}
              px={6}
              _hover={{
                bg: "blue.500",
              }}
            >
              Learn more
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};
