/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";

import { Show } from "@refinedev/chakra-ui";
import { useShow, IResourceComponentsProps } from "@refinedev/core";

import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  useBreakpointValue,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

import MDEditor from "@uiw/react-md-editor";

import { DateTag, UserCard } from "../../components/details";

//
// Components
//

/**
 * Details page for the ``Story`` entity.
 */
export const StoryDetailsPage: React.FC<IResourceComponentsProps> = () => {
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
              <Flex justifyContent={"space-between"}>
                <Heading as="h2" size="lg" mb={4}>
                  {story?.title}
                </Heading>

                <Flex gap={2}>
                  <>
                    {story?.updatedAt !== undefined && (
                      <DateTag date={story?.updatedAt} isToFormat={true} />
                    )}
                  </>
                </Flex>
              </Flex>

              <Divider mt={5} mb={10} />

              <Box mt={5} mb={8}>
                <MDEditor.Markdown
                  source={story?.description}
                  style={{ whiteSpace: "pre-wrap" }}
                />
              </Box>

              <Divider mb={8} />
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

              <Divider mb={8} />

              <Box mt={5} mb={8}>
                <Heading as="h3" size="md" mb={4}>
                  Experiences
                </Heading>
                <MDEditor.Markdown
                  source={story?.experiences}
                  style={{ whiteSpace: "pre-wrap" }}
                />
              </Box>

              <Divider mb={8} />

              <Box mt={5} mb={8}>
                <Heading as="h3" size="md" mb={4}>
                  Competencies required
                </Heading>
                <MDEditor.Markdown
                  source={story?.competencies}
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
