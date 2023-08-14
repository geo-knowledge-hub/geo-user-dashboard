/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

interface UserCountry {
  id: number;
  tag: string;
  name: string;
}

interface UserOrganization {
  id: number;
  name: string;
}

interface UserPackage {
  id: string;
  name: string;
}

interface UserProgramme {
  id: string;
  tag: string;
  name: string;
}

interface ApplicationUser {
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
}

interface ProviderUser {
  id: number;
  name: string;
  email: string;
  metadata: {
    countries: UserCountry[];
    organizations: UserOrganization[];
    programmes: UserProgramme[];
  };
}

interface Story {
  id: number;
  title: string;
  description: string;
  experiences: string;
  application_users: ApplicationUser[];
  createdAt: string;
}
