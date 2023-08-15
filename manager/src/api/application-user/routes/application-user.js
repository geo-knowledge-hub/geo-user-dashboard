/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

'use strict';

/**
 * application-user router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::application-user.application-user', {
  config: {
    create: {
      middlewares: ['global::assign-owner'],
    },
    find: {
      policies: ['global::is-owner'],
    },
    findOne: {
      policies: ['global::is-owner'],
    },
    update: {
      policies: ['global::is-owner'],
    },
    delete: {
      policies: ['global::is-owner'],
    },
  },
});
