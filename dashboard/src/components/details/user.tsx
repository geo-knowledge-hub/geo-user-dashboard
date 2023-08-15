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
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { Link as DOMLink } from "react-router-dom";

import _truncate from "lodash/truncate";

import ReactCountryFlag from "react-country-flag";
import { IconCalendar, IconExternalLink } from "@tabler/icons";
import React from "react";

//
// Types
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
  isToFormat: boolean;
}

/**
 * Date tag component.
 * @param date {string} date string.
 * @param isToFormat {boolean} Flag indicating if the value must be formatted as `Date string`.
 */
export const DateTag = ({ date, isToFormat }: DateCardProps) => {
  let newDate = date;

  if (isToFormat) {
    newDate = new Date(date).toDateString();
  }

  return (
    <Tag size={"lg"} colorScheme={"gray"}>
      <TagLeftIcon as={IconCalendar} />
      <TagLabel>{newDate}</TagLabel>
    </Tag>
  );
};

/**
 * Country Card component.
 * @param country {UserCountry} Country object.
 */
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

/**
 * Organization Card component.
 * @param organization {UserOrganization} Organization object.
 */
export const OrganizationCard = ({ organization }: OrganizationCardProps) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" padding="4" boxShadow="sm" mb={4}>
      <Text>{organization.name}</Text>
    </Box>
  );
};

/**
 * Programme Card component.
 * @param organization {UserProgramme} Programme object.
 */
export const ProgrammeCard = ({ programme }: ProgrammeCardProps) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" padding="4" boxShadow="sm" mb={4}>
      <Text>{programme.name}</Text>
    </Box>
  );
};

/**
 * Link Card component.
 * @param name {string} Name of the link.
 * @param link {string} Link value.
 * @param isExternal {boolean} Flag indicating if the link is external. Default value is `true`
 */
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

/**
 * Link Card component for internal routes.
 * @param name {string} Name of the link.
 * @param link {string} Link value.
 * @param isExternal {boolean} Flag indicating if the link is external. Default value is `true`
 */
export const InternalLinkCard = ({ name, link }: LinkCardProps) => {
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
        <Link as={DOMLink} to={link} flex={1} isTruncated>
          <Text isTruncated>{truncatedName}</Text>
        </Link>

        <Link as={DOMLink} to={link}>
          <IconExternalLink />
        </Link>
      </HStack>
    </Box>
  );
};
