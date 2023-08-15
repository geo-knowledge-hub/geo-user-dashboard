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
import {
  suggestActionTypes,
  suggestActionStatuses,
} from "../../resources/manager";
import { SelectionFieldSimple } from "./base/selection";

//
// Types
//
interface ActionFieldProps extends UseControllerProps {
  label: string;
}

interface SerializerProps {
  value: ActionApiMetadataDocument | SerializerResult;
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
 * Action Types.
 * @param name {string} Name of the field where the data will be stored (Requires ``React Hook Form`` storage). Supports
 *                      nested names (e.g., users)
 * @param label {string} Name of the field in the page.
 * @param control {Control} ``React Hook Form`` control
 * @param rules {array} ``React Hook Form`` rules.
 */
export const ActionTypeField = ({
  label,
  name,
  control,
  rules,
}: ActionFieldProps) => {
  /**
   * Load initial data.
   */
  const { isLoading, data: initialOptions } = useQuery(
    ["field-action-types"],
    () => {
      return suggestActionTypes("").then((data) => {
        return data.map((row: ActionApiMetadataDocument) => ({
          label: row.attributes.name,
          value: row,
        }));
      });
    },
  );

  /**
   * Load options function for the ``React Select``.
   */
  const loadOptionsFunction =
    generatePopulationFunction<ActionApiMetadataDocument>(
      (row: ActionApiMetadataDocument) => {
        return {
          label: row.attributes.name,
          value: row,
        };
      },
      suggestActionTypes,
    );

  /**
   * Serializer (Api Rest Document -> React Hook Form)
   */
  const serializer = (
    value: SerializerProps | null,
  ): SerializerResult | null => {
    return value !== null
      ? {
          id: value.value.id,
          name:
            "attributes" in value.value
              ? value.value?.attributes.name
              : value.value.name,
        }
      : null;
  };

  /**
   * Deserializer (React Hook Form -> React Select)
   */
  const deserializer = (
    value: SerializerResult | undefined,
  ): DeserializerResult | null => {
    if (value === undefined) return null;

    return {
      value: value,
      label: value.name,
    };
  };

  return (
    <Box mb={"3"}>
      <SelectionFieldSimple
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

/**
 * Action Status.
 * @param name {string} Name of the field where the data will be stored (Requires ``React Hook Form`` storage). Supports
 *                      nested names (e.g., users)
 * @param label {string} Name of the field in the page.
 * @param control {Control} ``React Hook Form`` control
 * @param rules {array} ``React Hook Form`` rules.
 */
export const ActionStatusField = ({
  label,
  name,
  control,
  rules,
}: ActionFieldProps) => {
  /**
   * Load initial data.
   */
  const { isLoading, data: initialOptions } = useQuery(
    ["field-action-status"],
    () => {
      return suggestActionStatuses("").then((data) => {
        return data.map((row: ActionApiMetadataDocument) => ({
          label: row.attributes.name,
          value: row,
        }));
      });
    },
  );

  /**
   * Load options function for the ``React Select``.
   */
  const loadOptionsFunction =
    generatePopulationFunction<ActionApiMetadataDocument>(
      (row: ActionApiMetadataDocument) => {
        return {
          label: row.attributes.name,
          value: row,
        };
      },
      suggestActionStatuses,
    );

  /**
   * Serializer (Api Rest Document -> React Hook Form)
   */
  const serializer = (
    value: SerializerProps | null,
  ): SerializerResult | null => {
    return value !== null
      ? {
          id: value.value.id,
          name:
            "attributes" in value.value
              ? value.value?.attributes.name
              : value.value.name,
        }
      : null;
  };

  /**
   * Deserializer (React Hook Form -> React Select)
   */
  const deserializer = (
    value: SerializerResult | undefined,
  ): DeserializerResult | null => {
    if (value === undefined) return null;

    return {
      value: value,
      label: value.name,
    };
  };

  return (
    <Box mb={"3"}>
      <SelectionFieldSimple
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
