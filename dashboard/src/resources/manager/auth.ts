/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import axios from "axios";
import { join } from "urlcat";

import { MANAGER_API_URL } from "../../constants";

/**
 * Read user profile from Manager.
 * @param bearerToken {string} Token to access the profile.
 */
export const readUserProfile = async (
  bearerToken: string,
): Promise<ManagerUserProfile[]> => {
  const profileUrl = "/api/users/me?populate=role";
  const operationUrl = join(MANAGER_API_URL, "/", profileUrl);

  const profileData = await axios.get(operationUrl, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  return profileData.data;
};
