/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { UserListPage } from "./list";
import { ActionCreatePage } from "./create";
import { ActionEditPage } from "./edit";
import { ActionDetailsPage } from "./details";
import { ResourceProps } from "@refinedev/core";

const buildResourcePath = (path: string) =>
  `${ActionRouterConfig.base.path}/${path}`;

/**
 * Router configurations for the ``Action`` entity.
 */
export const ActionRouterConfig = {
  name: "actions",
  base: {
    path: "/actions",
    component: <UserListPage />,
  },
  create: {
    path: "create",
    component: <ActionCreatePage />,
  },
  edit: {
    path: "edit/:id",
    component: <ActionEditPage />,
  },
  show: {
    path: "details/:id",
    component: <ActionDetailsPage />,
  },
};

/**
 * Resource configuration for the ``Action`` entity.
 */
export const ActionRouteResource: ResourceProps = {
  name: ActionRouterConfig.name,
  list: ActionRouterConfig.base.path,
  create: buildResourcePath(ActionRouterConfig.create.path),
  edit: buildResourcePath(ActionRouterConfig.edit.path),
  show: buildResourcePath(ActionRouterConfig.show.path),
  meta: {
    canDelete: true,
  },
};
