/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { useShow, IResourceComponentsProps } from "@refinedev/core";
import { Show } from "@refinedev/chakra-ui";
import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

import MDEditor from "@uiw/react-md-editor";
import { UserCard } from "../../components/details/story";
import React from "react";

//
// Components
//

export const StoryDetailsPage: React.FC<IResourceComponentsProps> = () => {
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");

  // Hooks
  const columnCount = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  const { queryResult } = useShow<Story>({
    meta: {
      populate: "*",
    },
  });
  const { data, isLoading } = queryResult;

  // Preparing data to render
  const story = data?.data;

  return (
    <Show isLoading={isLoading}>
      {!isLoading && (
        <Container maxW="container.xl" mt={5}>
          <VStack spacing={8} align="start">
            <Box
              w="full"
              p={8}
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="md"
            >
              <Heading as="h2" size="lg" mb={4}>
                {story?.title}
              </Heading>

              {/* Description */}
              <Box mt={5} mb={8}>
                <MDEditor.Markdown
                  source={story?.description}
                  style={{ whiteSpace: "pre-wrap" }}
                />
              </Box>

              {/* Users */}
              <Box mt={5} mb={8}>
                <Heading as="h3" size="md" mb={4}>
                  Users
                </Heading>
                <HStack wrap={"wrap"}>
                  {story?.application_users.map((user, index) => (
                    <UserCard user={user} />
                  ))}
                </HStack>
              </Box>

              {/* Divider before Experiences */}
              <Divider />

              {/* Divider before Experiences */}
              <Divider />

              {/* Experiences */}
              <Box mt={5} mb={8}>
                <Heading as="h3" size="md" mb={4}>
                  Experiences
                </Heading>
                <MDEditor.Markdown
                  source={story?.experiences}
                  style={{ whiteSpace: "pre-wrap" }}
                />
              </Box>
            </Box>
          </VStack>
        </Container>
      )}
    </Show>
  );
};
