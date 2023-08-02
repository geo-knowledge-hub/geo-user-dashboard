/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import axios, { AxiosRequestConfig } from "axios";
import { AuthConfig } from "./config";

/*
    Axios instance
*/
export const axiosInstance = axios.create();

/*
    Axios Instance Configuration
*/
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem(AuthConfig.storage_token_key);

  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});
