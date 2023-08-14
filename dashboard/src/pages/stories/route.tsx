/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { StoryListPage } from "./list";
import { StoryCreatePage } from "./create";
import { StoryEditPage } from "./edit";
import { StoryDetailsPage } from "./details";
import { ResourceProps } from "@refinedev/core";

const buildResourcePath = (path: string) =>
  `${StoryRouterConfig.base.path}/${path}`;

export const StoryRouterConfig = {
  name: "stories",
  base: {
    path: "/stories",
    component: <StoryListPage />,
  },
  create: {
    path: "create",
    component: <StoryCreatePage />,
  },
  edit: {
    path: "edit/:id",
    component: <StoryEditPage />,
  },
  show: {
    path: "details/:id",
    component: <StoryDetailsPage />,
  },
};

export const StoryRouteResource: ResourceProps = {
  name: StoryRouterConfig.name,
  list: StoryRouterConfig.base.path,
  create: buildResourcePath(StoryRouterConfig.create.path),
  edit: buildResourcePath(StoryRouterConfig.edit.path),
  show: buildResourcePath(StoryRouterConfig.show.path),
  meta: {
    canDelete: true,
  },
};
