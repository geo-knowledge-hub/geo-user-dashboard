/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { Link } from "react-router-dom";

import { IconLink } from "@tabler/icons";
import { VStack, Text, IconButton, Flex } from "@chakra-ui/react";

interface UserCardProps {
  user: ApplicationUser;
}

/**
 * User card.
 * @param user {ApplicationUser} User object.
 */
export const UserCard = ({ user }: UserCardProps) => {
  return (
    <Flex
      borderWidth="1px"
      borderRadius="lg"
      padding="7"
      boxShadow="sm"
      w="full"
      h="full"
      justifyContent={"center"}
      alignItems={"center"}
    >
      <VStack align="start" spacing={1} flex="1">
        <Text fontWeight="bold">{user.name}</Text>
        <Text fontSize="sm" color={"gray.700"}>
          {user.email}
        </Text>
      </VStack>

      <IconButton
        aria-label="View profile"
        icon={<IconLink />}
        colorScheme="gray"
        variant="ghost"
        as={Link}
        to={`/application-users/details/${user.id}`}
      />
    </Flex>
  );
};
