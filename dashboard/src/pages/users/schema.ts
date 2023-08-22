/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { z } from "zod";

/**
 * Application User schema.
 */
export const UserSchema = z.object({
  name: z.string().nonempty().min(1),
  email: z.string().email().nonempty("E-mail must be defined"),
  owner: z.number().or(z.undefined()),
  usage_date: z.string(),
  metadata: z.object({
    organizations: z
      .object({
        id: z.string().nonempty(),
        name: z.string().nonempty(),
        tag: z.string().or(z.undefined()),
      })
      .array()
      .nonempty(),
    countries: z
      .object({
        id: z.number(),
        name: z.string().nonempty(),
        tag: z.string().nonempty(),
      })
      .array()
      .nonempty(),
    packages: z
      .object({
        id: z.string().nonempty(),
        name: z.string().nonempty(),
      })
      .array()
      .nonempty(),
  }),
});

/**
 * Application User type.
 */
export type ApplicationUserType = z.infer<typeof UserSchema>;
