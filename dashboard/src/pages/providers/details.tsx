/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { IResourceComponentsProps } from "@refinedev/core";
import { ChakraUIShowInferencer } from "@refinedev/inferencer/chakra-ui";

export const ProviderDetailsPage: React.FC<IResourceComponentsProps> = () => {
  return (
    <ChakraUIShowInferencer
      fieldTransformer={(field) => {
        if (["locale", "updatedAt", "publishedAt"].includes(field.key)) {
          return false;
        }

        return field;
      }}
    />
  );
};
