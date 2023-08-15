/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { Box } from "@chakra-ui/react";

import { useQuery } from "react-query";
import { MultiValue } from "chakra-react-select";
import { UseControllerProps } from "react-hook-form";

import { MultiSelectionFieldSimple } from "./base";
import { generatePopulationFunction } from "./toolbox";
import { suggestUsers } from "../../resources/manager";

//
// Types
//
interface UsersFieldProps extends UseControllerProps {
  label: string;
}

interface SerializerProps {
  value: UserApiDocument | SerializerResult;
}

interface SerializerResult {
  id: number;
  name: string;
}

interface DeserializerResult {
  label: string;
  value: SerializerResult;
}

//
// Components
//

/**
 * Users fields (Nested field)
 * @param name {string} Name of the field where the data will be stored (Requires ``React Hook Form`` storage). Supports
 *                      nested names (e.g., users)
 * @param label {string} Name of the field in the page.
 * @param control {Control} ``React Hook Form`` control
 * @param rules {array} ``React Hook Form`` rules.
 */
export const UsersField = ({
  label,
  name,
  control,
  rules,
}: UsersFieldProps) => {
  /**
   * Load initial data.
   */
  const { isLoading, data: initialOptions } = useQuery(
    ["field-application-users"],
    () => {
      return suggestUsers("").then((data) => {
        return data.map((row: UserApiDocument) => ({
          label: row.attributes.name,
          value: row,
        }));
      });
    },
  );

  /**
   * Load options function for the ``React Select``.
   */
  const loadOptionsFunction = generatePopulationFunction<UserApiDocument>(
    (row: UserApiDocument) => {
      return {
        label: row.attributes.name,
        value: row,
      };
    },
    suggestUsers,
  );

  /**
   * Serializer (Api Rest Document -> React Hook Form)
   */
  const serializer = (
    values: MultiValue<SerializerProps> | null,
  ): SerializerResult[] | null => {
    return values !== null
      ? values.map((row) => ({
          id: row.value.id,
          name:
            "attributes" in row.value
              ? row.value?.attributes.name
              : row.value.name,
        }))
      : null;
  };

  /**
   * Deserializer (React Hook Form -> React Select)
   */
  const deserializer = (
    values: MultiValue<SerializerResult> | undefined,
  ): DeserializerResult[] | null => {
    if (values === undefined) return null;

    return values.map((row) => ({
      value: row,
      label: row.name,
    }));
  };

  return (
    <Box mb={"3"}>
      <MultiSelectionFieldSimple
        name={name}
        label={label}
        control={control}
        rules={rules}
        isLoading={isLoading}
        defaultOptions={initialOptions}
        loadOptions={loadOptionsFunction}
        serializer={serializer}
        deserializer={deserializer}
      />
    </Box>
  );
};
