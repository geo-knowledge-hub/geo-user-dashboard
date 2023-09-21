/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

/**
 * Application config
 */
export const BASE_PATH = import.meta.env.VITE_BASE_PATH || "/dashboard";

/**
 * Rest API configuration variables
 */
export const MANAGER_API_URL =
  import.meta.env.VITE_MANAGER_API_URL || "http://localhost:1337";

export const GKHUB_API_URL =
  import.meta.env.VITE_GKHUB_API_URL || "https://localhost:5000/api";

/**
 * Authentication configuration variables
 */
export const AUTH_USER_OBJECT_KEY = "user";
export const AUTH_USER_TOKEN_KEY = "token";
export const AUTH_PROVIDER_NAME = "gkhub";
export const AUTH_PROVIDER_CONNECT_URL =
  import.meta.env.VITE_AUTH_PROVIDER_CONNECT_URL ||
  "http://localhost:1337/api/connect/gkhub";
export const AUTH_PROVIDER_CALLBACK_URL =
  import.meta.env.VITE_AUTH_PROVIDER_CALLBACK_URL ||
  "http://localhost:1337/api/auth/gkhub/callback";

/**
 * Authentication roles variables
 */
export const PROVIDER_ACCESS_ROLE =
  "geo_secretariat" || import.meta.env.VITE_PROVIDER_ACCESS_ROLE;

/**
 * Project configuration variables
 */
export const PROJECT_ID = "0QFr32-fOBOTD-njz8yB";
