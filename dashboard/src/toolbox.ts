/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { ConditionalFilter, CrudOperators } from "@refinedev/core";

/**
 * Build a ``Conditional Filter``.
 * @param fields {string[]} Filter fields
 * @param operator {Exclude<CrudOperators, "or">} Logical filter operation
 * @param value {any} Value of the filter.
 */
export const buildConditionalFilter = (
  fields: string[],
  operator: Exclude<CrudOperators, "or">,
  value: any,
): ConditionalFilter => {
  const logicalFilters = fields.map((field) => ({
    field,
    operator,
    value,
  }));

  return {
    operator: "or",
    value: logicalFilters,
  };
};
