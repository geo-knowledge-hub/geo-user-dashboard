/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";

import MDEditor from "@uiw/react-md-editor";

import { Show } from "@refinedev/chakra-ui";
import { useShow, IResourceComponentsProps } from "@refinedev/core";

import {
  Box,
  Container,
  Divider,
  Heading,
  HStack,
  VStack,
  Flex,
  TagLeftIcon,
} from "@chakra-ui/react";

import { IconChecklist, IconActivity } from "@tabler/icons";

import { ActionTag, DateTag, UserCard } from "../../components/details";

//
// Components
//

/**
 * Details page for the ``Action`` entity.
 */
export const ActionDetailsPage: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<Action>({
    meta: {
      populate: "*",
    },
  });
  const { data, isLoading } = queryResult;

  // Preparing data to render
  const action = data?.data;

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
                  {action?.title}
                </Heading>

                <Flex gap={2}>
                  <>
                    {action?.status !== undefined && (
                      <ActionTag
                        text={action.status.name}
                        colorScheme={action.status.color}
                        size={"lg"}
                      >
                        <TagLeftIcon as={IconActivity} />
                      </ActionTag>
                    )}
                  </>
                  <>
                    {action?.type !== undefined && (
                      <ActionTag
                        text={action.type.name}
                        colorScheme={action.type.color}
                        size={"lg"}
                      >
                        <TagLeftIcon as={IconChecklist} />
                      </ActionTag>
                    )}
                  </>
                  <>
                    {action?.updatedAt !== undefined && (
                      <DateTag date={action?.updatedAt} isToFormat={true} />
                    )}
                  </>
                </Flex>
              </Flex>

              <Divider mt={5} mb={10} />

              {/* Description */}
              <Box mt={5} mb={8}>
                <MDEditor.Markdown
                  source={action?.description}
                  style={{ whiteSpace: "pre-wrap" }}
                />
              </Box>

              <Divider />

              {/* Users */}
              <Box mt={5} mb={8}>
                <Heading as="h3" size="md" mb={4}>
                  Users
                </Heading>
                <HStack wrap={"wrap"}>
                  {action?.application_users.map((user, index) => (
                    <UserCard user={user} key={index} />
                  ))}
                </HStack>
              </Box>
            </Box>
          </VStack>
        </Container>
      )}
    </Show>
  );
};
