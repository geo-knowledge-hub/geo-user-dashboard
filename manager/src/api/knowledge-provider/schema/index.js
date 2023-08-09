/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

const yup = require('yup');

module.exports = yup.object({
  name: yup.string().required().min(1),
  email: yup.string().email().required(),
  owner: yup.number().integer().notRequired(),
  metadata: yup
    .object({
      organizations: yup
        .array()
        .of(
          yup.object({
            id: yup.string().required(),
            name: yup.string().required(),
            tag: yup.string(),
          })
        )
        .required(),
      countries: yup.array().of(
        yup.object({
          id: yup.string().required(),
          name: yup.string().required(),
          tag: yup.string().required(),
        })
      ),
      programmes: yup
        .array()
        .of(
          yup.object({
            id: yup.string().required(),
            name: yup.string().required(),
            tag: yup.string().required(),
          })
        )
        .required(),
    })
    .required(),
});
