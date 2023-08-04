/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { useEffect } from "react";

import { Box, Image } from "@chakra-ui/react";
import { OAuthProvider, useLogin } from "@refinedev/core";
import { useLocation, useParams } from "react-router-dom";

import { AuthConfig } from "../config";

import GKHLogo from "../assets/gkh-logo.svg";

/**
 * Component to complete the login flow handling
 * requests from Auth Backend.
 */
export const AuthLoginRedirect: React.FC = () => {
  const location = useLocation();
  const params = useParams();

  const { mutate: login } = useLogin();

  useEffect(() => {
    // `Access token` from provider as param
    // https://docs.strapi.io/dev-docs/plugins/users-permissions#understanding-the-login-flow
    fetch(`${AuthConfig.provider_callback_url}${location.search}`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
        }
        return res;
      })
      .then((res) => res.json())
      .then((res) => {
        login({ response: res });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location.search, params.providerName]);

  return <></>;
};

/**
 * List of Auth providers available in the dashboard.
 */
export const AuthProviders: OAuthProvider[] = [
  {
    name: "gkhub",
    icon: (
      <Box boxSize="8">
        <Image src={GKHLogo} />
      </Box>
    ),
    label: "Sign in with GEO Knowledge Hub",
  },
];
