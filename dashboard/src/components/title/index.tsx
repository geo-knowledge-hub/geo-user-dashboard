/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import { Link } from "react-router-dom";

import GKHLogo from "../../assets/gkh-logo.svg";
import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import { TitleProps } from "@refinedev/core";

/**
 * Title component for the dashboard sidebar.
 */
export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  return (
    <Link to="/">
      {collapsed ? (
        <Box boxSize={"8"}>
          <Image src={GKHLogo} />
        </Box>
      ) : (
        <Flex gap="5" alignItems={"center"}>
          <Box boxSize={"8"}>
            <Image src={GKHLogo} />
          </Box>
          <Heading fontSize={"md"}>Dashboard</Heading>
        </Flex>
      )}
    </Link>
  );
};
