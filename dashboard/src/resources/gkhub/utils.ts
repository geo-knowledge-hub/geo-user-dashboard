/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { RecordApiClient, VocabulariesApiClient } from "../gkhub";

/**
 * Generic function to suggest data to users using the GEO Knowledge Hub Vocabulary API.
 * @param apiPrefix {string} Endpoint to get suggestions
 * @param suggestText {string} Base text to generate suggestions.
 */
async function suggestVocabulary<T>(
  apiPrefix: string,
  suggestText: string,
): Promise<T[]> {
  const vocabulariesApi = new VocabulariesApiClient<HubApiResponse<T>>(
    apiPrefix,
  );

  return vocabulariesApi.suggest(suggestText).then((response) => {
    return response.data.hits.hits;
  });
}

/**
 * Suggest organizations.
 * @param suggestText {string} Base text to generate ``organizations`` suggestions.
 */
export const suggestOrganizations = (
  suggestText: string,
): Promise<OrganizationApiDocument[]> => {
  return suggestVocabulary<OrganizationApiDocument>(
    "affiliations",
    suggestText,
  );
};

/**
 * Suggest GEO Work Programme Activities.
 * @param suggestText {string} Base text to generate ``programme`` suggestions.
 */
export const suggestProgramme = (
  suggestText: string,
): Promise<ProgrammeApiDocument[]> => {
  return suggestVocabulary<ProgrammeApiDocument>(
    "vocabularies/geowptypes",
    suggestText,
  );
};

/**
 * Search for Knowledge Packages available in the GEO Knowledge Hub.
 * @param query {HubQueryObject} Query object.
 */
export const searchPackages = async (
  query: HubQueryObject,
): Promise<HubApiResponse<KnowledgePackageApiDocument>> => {
  const packagesApiClient = new RecordApiClient<
    HubApiResponse<KnowledgePackageApiDocument>
  >("packages");

  return packagesApiClient.search(query).then((response) => response.data);
};
