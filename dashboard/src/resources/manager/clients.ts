/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import urlcat from "urlcat";

import { AxiosInstance } from "axios";

import { BaseApiClient } from "../base";
import { axiosInstance } from "../../network";

import { MANAGER_API_URL } from "../../constants";

/**
 * Client for the Manager API.
 */
export class ManagerApiClient<T> extends BaseApiClient<T> {
  constructor(apiPrefix: string, httpClient: AxiosInstance = axiosInstance) {
    super(MANAGER_API_URL, apiPrefix, httpClient);
  }

  /**
   * Suggest values based on user input.
   * @param suggestText {string} Base text to generate the suggestions.
   * @param suggestKey {string} Field from the entity used to create suggestions (e.g., Name, Title).
   */
  async suggest(
    suggestText: string,
    suggestKey: string,
  ): Promise<ApiClientResponse<T>> {
    const operationUrl = urlcat(this.apiUrl, {
      filters: {
        [suggestKey]: {
          $containsi: suggestText,
        },
      },
    });

    return this.createResponse(() => this.httpClient.get(operationUrl));
  }
}
