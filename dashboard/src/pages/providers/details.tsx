/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";

import { useShow, IResourceComponentsProps } from "@refinedev/core";
import { Show } from "@refinedev/chakra-ui";

import {
  Box,
  Container,
  Divider,
  Heading,
  Link,
  SimpleGrid,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";

import {
  CountryCard,
  OrganizationCard,
  ProgrammeCard,
} from "../../components/details";

//
// Components
//

/**
 * Details page for the ``Knowledge Provider`` entity.
 */
export const ProviderDetailsPage: React.FC<IResourceComponentsProps> = () => {
  // Hooks
  const columnCount = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  const { queryResult } = useShow<ProviderUser>();
  const { data, isLoading } = queryResult;

  // Preparing data to render
  const record = data?.data;

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
                {record?.name}
              </Heading>

              <Text fontSize="lg" color="gray.600" mb={4}>
                <Link href={`mailto:${record?.email}`}>{record?.email}</Link>
              </Text>

              <Divider mb={4} />

              <Heading as="h3" size="md" mb={4}>
                Countries
              </Heading>
              <SimpleGrid columns={columnCount} spacing={4}>
                {record?.metadata.countries.map((country, index) => (
                  <CountryCard key={index} country={country} />
                ))}
              </SimpleGrid>

              <Divider mt={8} mb={4} />

              <Heading as="h3" size="md" mb={4}>
                Organizations
              </Heading>
              <SimpleGrid columns={columnCount} spacing={4}>
                {record?.metadata.organizations.map((org, index) => (
                  <OrganizationCard key={index} organization={org} />
                ))}
              </SimpleGrid>

              <Divider mt={8} mb={4} />

              <Heading as="h3" size="md" mb={4}>
                GEO Work Programme Activities
              </Heading>
              <SimpleGrid columns={columnCount} spacing={4}>
                {record?.metadata.programmes.map((programme, index) => (
                  <ProgrammeCard key={index} programme={programme} />
                ))}
              </SimpleGrid>
            </Box>
          </VStack>
        </Container>
      )}
    </Show>
  );
};
