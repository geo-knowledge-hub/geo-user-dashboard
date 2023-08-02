'use strict';

/**
 * action-status service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::action-status.action-status');
