/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { join } from "urlcat";

import { axiosInstance } from "../network";
import { AxiosInstance, AxiosResponse } from "axios";

export class BaseApiClient {
  apiUrl: string;
  httpClient: AxiosInstance;

  constructor(
    apiUrl: string,
    apiPrefix: string,
    httpClient: AxiosInstance = axiosInstance,
  ) {
    this.httpClient = httpClient;
    this.apiUrl = join(apiUrl, "/", apiPrefix);
  }

  async createResponse(
    axiosCall: () => Promise<AxiosResponse>,
  ): Promise<ApiClientResponse> {
    try {
      let response: AxiosResponse = await axiosCall();

      return {
        data: response.data,
        code: response.data.status,
        errors: response.data.errors,
      };
    } catch (error: any) {
      return {
        data: error.response.data,
        code: error.response.data.errors,
        errors: error.response.status,
      };
    }
  }
}
