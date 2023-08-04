'use strict';

/**
 * knowledge-provider service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService(
  'api::knowledge-provider.knowledge-provider'
);
