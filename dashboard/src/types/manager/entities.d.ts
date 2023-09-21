/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

/**
 * Mixin interface with common properties available
 * on objects from Manager
 */
interface BaseEntity {
  createdAt: string;
  updatedAt: string;
}

/**
 * User country representation object.
 */
interface UserCountry {
  id: number;
  tag: string;
  name: string;
}

/**
 * User organization representation object.
 */
interface UserOrganization {
  id: number;
  name: string;
}

/**
 * User package representation object.
 */
interface UserPackage {
  id: string;
  name: string;
}

/**
 * User programme representation object.
 */
interface UserProgramme {
  id: string;
  tag: string;
  name: string;
}

/**
 * Application user entity.
 */
interface ApplicationUser extends BaseEntity {
  id: number;
  name: string;
  email: string;
  usage_date: string;
  metadata: {
    countries: UserCountry[];
    organizations: UserOrganization[];
    packages: UserPackage[];
    programmes: UserProgramme[];
  };
  stories: Story[];
}

/**
 * Knowledge Provider entity.
 */
interface ProviderUser extends BaseEntity {
  id: number;
  name: string;
  email: string;
  metadata: {
    countries: UserCountry[];
    organizations: UserOrganization[];
    programmes: UserProgramme[];
    packages: UserPackage[];
  };
}

/**
 * Story entity.
 */
interface Story extends BaseEntity {
  id: number;
  title: string;
  description: string;
  experiences: string;
  competencies: string;
  application_users: ApplicationUser[];
  metadata: {
    packages: UserPackage[];
  };
}

/**
 * Action metadata field entity (e.g., Type or Status).
 */
interface ActionMetadata extends BaseEntity {
  id: number;
  name: string;
  color: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Action entity.
 */
interface Action extends BaseEntity {
  title: string;
  description: string;
  application_users: ApplicationUser[];
  status: ActionMetadata;
  type: ActionMetadata;
}
