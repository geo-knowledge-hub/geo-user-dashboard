/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { z } from "zod";

/**
 * Knowledge Provider Schema.
 */
export const KnowledgeProviderSchema = z.object({
  name: z.string().nonempty().min(1),
  email: z.string().email().nonempty("E-mail must be defined"),
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
    programmes: z
      .object({
        id: z.string().nonempty(),
        name: z.string().nonempty(),
        tag: z.string().nonempty(),
      })
      .array()
      .nonempty(),
  }),
});

/**
 * Knowledge Provider type.
 */
export type KnowledgeProviderType = z.infer<typeof KnowledgeProviderSchema>;
