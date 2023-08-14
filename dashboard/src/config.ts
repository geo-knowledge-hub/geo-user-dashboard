/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import {
  MANAGER_API_URL,
  AUTH_PROVIDER_CALLBACK_URL,
  AUTH_PROVIDER_CONNECT_URL,
  AUTH_PROVIDER_NAME,
  AUTH_USER_OBJECT_KEY,
  AUTH_USER_TOKEN_KEY,
} from "./constants";

/**
 * Application Authentication configuration object
 */
export const AuthConfig = {
  provider_name: AUTH_PROVIDER_NAME,
  provider_connect_url: AUTH_PROVIDER_CONNECT_URL,
  provider_callback_url: AUTH_PROVIDER_CALLBACK_URL,
  storage_user_key: AUTH_USER_OBJECT_KEY,
  storage_token_key: AUTH_USER_TOKEN_KEY,
};

/**
 * (Data Provider) Rest API Configuration
 */
export const ProviderRestAPI = `${MANAGER_API_URL}/api`;
