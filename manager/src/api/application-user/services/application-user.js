'use strict';

/**
 * application-user service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::application-user.application-user');
