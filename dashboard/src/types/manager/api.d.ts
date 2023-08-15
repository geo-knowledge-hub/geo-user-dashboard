/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

/**
 * General Manager Response.
 */
interface ManagerApiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/**
 * Country Document.
 */
interface CountryApiDocument {
  id: string;
  attributes: {
    name: string;
    tag: string;
    createdAt: string;
    updatedAt: string;
  };
}

/**
 * User Document.
 */
interface UserApiDocument {
  id: number;
  attributes: {
    name: string;
    email: string;
    usage_date: string;
    metadata: {
      countries: UserCountry[];
      organizations: UserOrganization[];
      packages: UserPackage[];
      programmes: UserProgramme[];
    };
  };
}

/**
 * Action Metadata Document (Types and Status).
 */
interface ActionApiMetadataDocument {
  id: number;
  attributes: {
    name: string;
    description: string;
    color: string;
  };
}

/**
 * Action Document.
 */
interface ActionApiDocument {
  id: number;
  attributes: {
    title: string;
    description: string;
    application_users: UserApiDocument[];
    statuses: ActionApiMetadataDocument[];
    types: ActionApiMetadataDocument[];
  };
}
