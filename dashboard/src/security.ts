/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { AccessControlProvider } from "@refinedev/core";

import { AuthConfig } from "./config";
import { PROVIDER_ACCESS_ROLE } from "./constants";

/**
 * Permission generator. It validates the rules
 * available on the backend.
 *
 * This class is helpful for hiding pages that users can visualize. By doing this,
 * we avoid access errors (The backend is already validating the access).
 *
 */
export class RolePermissionGenerator {
  private static rules = [
    {
      resource: "knowledge-providers",
      requires: PROVIDER_ACCESS_ROLE,
    },
  ];

  static generate(): AccessControlProvider {
    const rules = this.rules;
    const userData: string | null = localStorage.getItem(
      AuthConfig.storage_user_key,
    );

    const isUserValid = !!userData;

    return {
      can: async ({ resource, action, params }) => {
        if (isUserValid) {
          const user: ManagerUserProfile = JSON.parse(userData);

          const ruleResponses = rules.map((rule) => {
            if (rule.resource === resource) {
              return rule.requires === user.role.type;
            }

            // Rule is not applied
            return true;
          });

          return { can: ruleResponses.some((t) => t) };
        }

        return { can: false };
      },
      options: {
        buttons: {
          enableAccessControl: true,
          hideIfUnauthorized: false,
        },
      },
    };
  }
}
