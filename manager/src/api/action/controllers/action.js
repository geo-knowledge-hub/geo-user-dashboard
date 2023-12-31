/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

'use strict';

const schema = require('../schema');
const isOwnerFilter = require('../../../security/is-owner-filter');

/**
 * action controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::action.action', ({ strapi }) => ({
  async create(ctx) {
    const modelData = ctx.request.body.data;
    const modelDataIsValid = await schema.isValid(modelData);

    if (modelDataIsValid) {
      return await super.create(ctx);
    }

    return ctx.badRequest('Invalid data format', {});
  },
  async find(ctx) {
    const filteredCtx = isOwnerFilter(ctx);
    return await super.find(filteredCtx);
  },
}));
