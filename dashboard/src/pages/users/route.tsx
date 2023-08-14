/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { UserListPage } from "./list";
import { UserCreatePage } from "./create";
import { UserEditPage } from "./edit";
import { UserDetailsPage } from "./details";
import { ResourceProps } from "@refinedev/core";

const buildResourcePath = (path: string) =>
  `${UserRouteConfig.base.path}/${path}`;

/**
 * Router configurations for the ``Application User`` entity.
 */
export const UserRouteConfig = {
  name: "application-users",
  base: {
    path: "/application-users",
    component: <UserListPage />,
  },
  create: {
    path: "create",
    component: <UserCreatePage />,
  },
  edit: {
    path: "edit/:id",
    component: <UserEditPage />,
  },
  show: {
    path: "details/:id",
    component: <UserDetailsPage />,
  },
};

/**
 * Resource configuration for the ``Application User`` entity.
 */
export const UserRouteResource: ResourceProps = {
  name: UserRouteConfig.name,
  list: UserRouteConfig.base.path,
  create: buildResourcePath(UserRouteConfig.create.path),
  edit: buildResourcePath(UserRouteConfig.edit.path),
  show: buildResourcePath(UserRouteConfig.show.path),
  meta: {
    canDelete: true,
  },
};
