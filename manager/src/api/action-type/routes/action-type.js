'use strict';

/**
 * action-type router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::action-type.action-type');
