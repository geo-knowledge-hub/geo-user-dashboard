/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { ManagerApiClient } from "./clients";

/**
 * Generic function to suggest data to users using the Manager Entities API.
 * @param apiPrefix {string} Endpoint to get suggestions
 * @param suggestText {string} Base text to generate suggestions.
 * @param suggestKey {string} Field from the entity used to create suggestions (e.g., Name, Title).
 */
async function suggestEntity<T>(
  apiPrefix: string,
  suggestKey: string,
  suggestText: string,
): Promise<T[]> {
  const managerApi = new ManagerApiClient<ManagerApiResponse<T>>(apiPrefix);

  return managerApi.suggest(suggestText, suggestKey).then((response) => {
    return response.data.data;
  });
}

/**
 * Suggest countries.
 * @param suggestText {string} Base text to generate ``countries`` suggestions.
 */
export const suggestCountries = (
  suggestText: string,
): Promise<CountryApiDocument[]> => {
  return suggestEntity<CountryApiDocument>(
    "api/countries",
    "name",
    suggestText,
  );
};

/**
 * Suggest countries.
 * @param suggestText {string} Base text to generate ``countries`` suggestions.
 */
export const suggestUsers = (
  suggestText: string,
): Promise<UserApiDocument[]> => {
  return suggestEntity<UserApiDocument>(
    "api/application-users",
    "name",
    suggestText,
  );
};

/**
 * Suggest Action Types.
 * @param suggestText {string} Base text to generate ``action types`` suggestions.
 */
export const suggestActionTypes = (
  suggestText: string,
): Promise<ActionApiMetadataDocument[]> => {
  return suggestEntity<ActionApiMetadataDocument>(
    "api/action-types",
    "name",
    suggestText,
  );
};

/**
 * Suggest Action Status.
 * @param suggestText {string} Base text to generate ``action status`` suggestions.
 */
export const suggestActionStatuses = (
  suggestText: string,
): Promise<ActionApiMetadataDocument[]> => {
  return suggestEntity<ActionApiMetadataDocument>(
    "api/action-statuses",
    "name",
    suggestText,
  );
};
