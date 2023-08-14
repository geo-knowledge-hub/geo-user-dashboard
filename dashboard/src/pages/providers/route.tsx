/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { ProviderListPage } from "./list";
import { ProviderCreatePage } from "./create";
import { ProviderEditPage } from "./edit";
import { ProviderDetailsPage } from "./details";
import { ResourceProps } from "@refinedev/core";

const buildResourcePath = (path: string) =>
  `${ProviderRouterConfig.base.path}/${path}`;

/**
 * Router configurations for the ``Knowledge Provider`` entity.
 */
export const ProviderRouterConfig = {
  name: "knowledge-providers",
  base: {
    path: "/knowledge-providers",
    component: <ProviderListPage />,
  },
  create: {
    path: "create",
    component: <ProviderCreatePage />,
  },
  edit: {
    path: "edit/:id",
    component: <ProviderEditPage />,
  },
  show: {
    path: "details/:id",
    component: <ProviderDetailsPage />,
  },
};

/**
 * Resource configuration for the ``Knowledge Provider`` entity.
 */
export const ProviderRouteResource: ResourceProps = {
  name: ProviderRouterConfig.name,
  list: ProviderRouterConfig.base.path,
  create: buildResourcePath(ProviderRouterConfig.create.path),
  edit: buildResourcePath(ProviderRouterConfig.edit.path),
  show: buildResourcePath(ProviderRouterConfig.show.path),
  meta: {
    canDelete: true,
  },
};
