/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { z } from "zod";

/**
 * Action schema.
 */
export const ActionSchema = z.object({
  title: z.string().nonempty(),
  description: z
    .string()
    .min(20, "The description must have at least 20 characters")
    .max(200, "The description must be up to 200 characters"),
  application_users: z
    .array(z.object({ name: z.string(), id: z.number() }))
    .transform((val) => {
      return val.map((row) => row.id);
    }),
  status: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .transform((val) => {
      return val.id;
    }),
  type: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .transform((val) => {
      return val.id;
    }),
});

/**
 * Action type.
 */
export type ActionType = z.infer<typeof ActionSchema>;
