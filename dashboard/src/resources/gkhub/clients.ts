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

import { GKHUB_API_URL } from "../../constants";

/**
 * Client for the GEO Knowledge Hub Vocabularies API.
 */
export class VocabulariesApiClient<T> extends BaseApiClient<T> {
  constructor(apiPrefix: string, httpClient: AxiosInstance = axiosInstance) {
    super(GKHUB_API_URL, apiPrefix, httpClient);
  }

  /**
   * Suggest values based on user input.
   * @param suggestText {string} Base text to generate the suggestions.
   */
  async suggest(suggestText: string): Promise<ApiClientResponse<T>> {
    const operationUrl = urlcat(this.apiUrl, {
      suggest: suggestText,
    });

    return this.createResponse(() => this.httpClient.get(operationUrl));
  }
}

/**
 * Client for the GEO Knowledge Hub Records API.
 *
 * @note This client can be used to interact with Records and Packages APIs.
 */
export class RecordApiClient<T> extends BaseApiClient<T> {
  constructor(apiPrefix: string, httpClient: AxiosInstance = axiosInstance) {
    super(GKHUB_API_URL, apiPrefix, httpClient);
  }

  /**
   * Search records based on user input.
   * @param searchArgs {object} Search criteria including ``q`` (query text), ``page``,
   *                            and ``size`` (page size).
   */
  async search(searchArgs: {
    q?: string;
    page?: number;
    size?: number;
  }): Promise<ApiClientResponse<T>> {
    const operationUrl = urlcat(this.apiUrl, searchArgs);
    return this.createResponse(() => this.httpClient.get(operationUrl));
  }
}
