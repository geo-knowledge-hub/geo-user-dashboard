/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

/**
 * General GEO Knowledge Hub Query Object.
 */
interface HubQueryObject {
  q: string;
  page: number;
  size: number;
}

/**
 * General GEO Knowledge Hub API Response.
 */
interface HubApiResponse<T> {
  hits: {
    hits: T[];
    total: number;
  };
  links: {
    self: string;
    next?: string;
    prev?: string;
  };
}

/**
 * Organization Document.
 */
interface OrganizationApiDocument {
  id: string;
  name: string;
  acronym: string;
}

/**
 * GEO Work Programme Document.
 */
interface ProgrammeApiDocument {
  id: string;
  title: {
    en: string;
  };
  props: {
    acronym: string;
  };
}

/**
 * Knowledge Package Document.
 */
interface KnowledgePackageApiDocument {
  id: string;
  status: string;
  updated: string;
  metadata: {
    id: string;
    title: string;
    description: string;
    creators: {
      person_or_org: {
        name: string;
      };
    }[];
  };
  links: {
    self: string;
    self_html: string;
  };
}
