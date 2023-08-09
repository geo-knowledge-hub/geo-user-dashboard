/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { RefineThemes } from "@refinedev/chakra-ui";

import { extendTheme } from "@chakra-ui/react";

export const DashboardTheme = extendTheme({
  ...RefineThemes.Blue,
  styles: {
    global: {
      "::-webkit-scrollbar": {
        width: "4px",
      },
      "::-webkit-scrollbar-track": {
        width: "6px",
      },
      "::-webkit-scrollbar-thumb": {
        background: "#d1d1d1",
        borderRadius: "24px",
      },
    },
  },
});
