/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { z } from "zod";

/**
 * Stories schemas.
 */

export const StoryUserSchema = z.object({
  id: z.number(),
  name: z.string().nonempty(),
  email: z.string().nonempty(),
});

export const StorySchema = z.object({
  title: z.string().nonempty(),
  description: z
    .string()
    .min(20, "The description must have at least 20 characters")
    .max(350, "The description must have up to 350 characters"),
  experiences: z
    .string()
    .nonempty("Please, provide the user experiences")
    .min(150, "The description must have at least 150 characters"),
  competencies: z
    .string()
    .nonempty(
      "Please, provide the user competencies required to use the application",
    )
    .min(150, "The description must have at least 150 characters"),
  application_users: z
    .array(z.object({ name: z.string(), id: z.number() }))
    .transform((val) => {
      return val.map((row) => row.id);
    }),
  metadata: z.object({
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
 * Stories type.
 */
export type StoryType = z.infer<typeof StorySchema>;
export type StoryUserType = z.infer<typeof StoryUserSchema>;
