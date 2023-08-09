/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import {
  Box,
  Flex,
  HStack,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import _truncate from "lodash/truncate";

import ReactCountryFlag from "react-country-flag";
import { IconCalendar, IconExternalLink } from "@tabler/icons";

//
// Data Types and Interfaces
//
interface CountryCardProps {
  country: UserCountry;
}

interface OrganizationCardProps {
  organization: UserOrganization;
}

interface ProgrammeCardProps {
  programme: UserProgramme;
}

interface LinkCardProps {
  name: string;
  link: string;
}

interface DateCardProps {
  date: string;
}

export const DateTag = ({ date }: DateCardProps) => {
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");

  return (
    <HStack
      bg={bgColor}
      borderRadius="lg"
      paddingX="2"
      paddingY="1"
      alignItems="center"
      spacing={2}
    >
      <IconCalendar />
      <Text color={textColor}>{date}</Text>
    </HStack>
  );
};

export const CountryCard = ({ country }: CountryCardProps) => {
  return (
    <Flex
      align="center"
      borderWidth="1px"
      borderRadius="lg"
      padding="4"
      boxShadow="sm"
      mb={4}
    >
      <ReactCountryFlag
        countryCode={country.tag}
        style={{ fontSize: "2em", marginRight: "10px" }}
        svg
      />
      <Text>{country.name}</Text>
    </Flex>
  );
};

export const OrganizationCard = ({ organization }: OrganizationCardProps) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" padding="4" boxShadow="sm" mb={4}>
      <Text>{organization.name}</Text>
    </Box>
  );
};

export const ProgrammeCard = ({ programme }: ProgrammeCardProps) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" padding="4" boxShadow="sm" mb={4}>
      <Text>{programme.name}</Text>
    </Box>
  );
};

export const LinkCard = ({ name, link }: LinkCardProps) => {
  const hoverBgColor = useColorModeValue("gray.100", "gray.700");

  const truncatedName = _truncate(name, { length: 80 });

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      padding="4"
      boxShadow="sm"
      mb={4}
      transition="background 0.2s"
      _hover={{ background: hoverBgColor }}
    >
      <HStack spacing={2} align="center">
        <Link href={link} isExternal flex={1} isTruncated>
          <Text isTruncated>{truncatedName}</Text>
        </Link>

        <Link href={link} isExternal>
          <IconExternalLink />
        </Link>
      </HStack>
    </Box>
  );
};
