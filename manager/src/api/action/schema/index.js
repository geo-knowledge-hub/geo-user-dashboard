/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

const yup = require('yup');

module.exports = yup.object({
  title: yup.string().required().min(1),
  description: yup.string().required().min(20),
  application_users: yup.array().of(yup.number()).required(),
  status: yup.number().integer().required(),
  type: yup.number().integer().required(),
  owner: yup.number().integer().notRequired(),
});
