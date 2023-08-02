/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

module.exports = ({ env }) => ({
  sentry: {
    enabled: true,
    config: {
      dsn: env('SENTRY_DSN'),
      sendMetadata: true,
    },
  },
  'entity-notes': {
    enabled: true,
  },
  documentation: {
    enabled: true,
    config: {
      openapi: '3.0.0',
      info: {
        version: '1.0.0',
        title: 'GEO Knowledge Hub User dashboard manager Rest API documentation',
        description: 'Documentation of the GEO Knowledge Hub Dashboard manager Rest API',
        license: {
          name: 'MIT',
          url: 'https://opensource.org/licenses/MIT',
        },
        termsOfService: '#',
        contact: {
          name: 'GEO Secretariat',
          email: 'secretariat@geosec.org',
          url: 'https://www.earthobservations.org/index.php',
        },
      },
      'x-strapi-config': {
        plugins: ['upload', 'users-permissions'],
        path: '/documentation',
      },
      security: [{ bearerAuth: [] }],
    },
  },
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        s3Options: {
          accessKeyId: env('AWS_ACCESS_KEY_ID'),
          secretAccessKey: env('AWS_ACCESS_SECRET'),
          region: env('AWS_REGION'),
          params: {
            ACL: 'private',
            signedUrlExpires: env('AWS_SIGNED_URL_EXPIRES', 60 * 60 * 24 * 7),
            Bucket: env('AWS_BUCKET'),
          },
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
  'import-export-entries': {
    enabled: true,
    config: { }
  },
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '7d'
      }
    }
  }
});
