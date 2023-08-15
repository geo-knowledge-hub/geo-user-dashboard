/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { AuthBindings } from "@refinedev/core";

import { AuthConfig } from "../config";

import axios from "axios";

/**
 * Authentication flow for the dashboard auth providers.
 */
export const AuthProvider: AuthBindings = {
  login: async ({
    providerName,
    response,
  }: {
    providerName: string;
    response: CredentialResponse;
  }) => {
    if (providerName === AuthConfig.provider_name) {
      window.location.href = AuthConfig.provider_connect_url;

      return {
        success: true,
      };
    }

    if (response.user) {
      localStorage.setItem(
        AuthConfig.storage_user_key,
        JSON.stringify(response.user),
      );
      localStorage.setItem(AuthConfig.storage_token_key, response.jwt);

      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        name: "Login failed",
        message: "Can't login using your credentials",
      },
    };
  },
  logout: async () => {
    const token = localStorage.getItem(AuthConfig.storage_token_key);

    if (token && typeof window !== "undefined") {
      localStorage.removeItem(AuthConfig.storage_token_key);
      localStorage.removeItem(AuthConfig.storage_user_key);
      axios.defaults.headers.common = {};
    }

    return {
      success: true,
      redirectTo: "/login",
    };
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
  check: async () => {
    const token = localStorage.getItem(AuthConfig.storage_token_key);

    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      error: {
        message: "Check failed",
        name: "Not authenticated",
      },
      logout: true,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const user = localStorage.getItem(AuthConfig.storage_user_key);

    if (user) {
      return JSON.parse(user);
    }

    return null;
  },
};
