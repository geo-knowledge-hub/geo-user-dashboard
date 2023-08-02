'use strict';

/**
 * action-type service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::action-type.action-type');
