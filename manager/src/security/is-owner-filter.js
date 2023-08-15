/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

'use strict';

module.exports = (ctx) => {
  const { filters } = ctx.query;
  ctx.query = {
    ...ctx.query,
    filters: {
      ...filters,
      owner: {
        id: ctx.state.user.id,
      },
    },
  };
  return ctx;
};
