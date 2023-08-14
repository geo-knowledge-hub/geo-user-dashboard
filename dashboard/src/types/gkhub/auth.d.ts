/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

interface UserPayload {
  id: number;
  email: string;
  confirmed: boolean;
  createdAt: string;
  updatedAt: string;
  provider: string;
  username: null | string;
}

interface CredentialResponse {
  jwt: string;
  user: UserPayload;
}
