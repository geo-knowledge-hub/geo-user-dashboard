/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

'use strict';

/**
 * `is-owner` policy
 */

module.exports = async (policyContext, config, { strapi }) => {
  const ctx = policyContext;

  if (!ctx.state.isAuthenticated) return false;

  const api = ctx.state.route.info.apiName;

  const service = strapi.service(`api::${api}.${api}`);

  if (!service) return false;
  if (!ctx.params.id) return true;
  const {
    results: [content],
  } = await service.find({
    filters: {
      id: {
        $eq: ctx.params.id,
      },
      owner: {
        id: {
          $eq: ctx.state.user.id,
        },
      },
    },
    publicationState: 'preview',
  });

  return !!content;
};
