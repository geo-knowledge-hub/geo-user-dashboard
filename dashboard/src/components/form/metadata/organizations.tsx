/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { useQuery } from "react-query";
import { MultiValue } from "chakra-react-select";
import { UseControllerProps } from "react-hook-form";

import { MultiSelectionFieldNested } from "../base";
import { generatePopulationFunction } from "../toolbox";
import { suggestOrganizations } from "../../../resources/gkhub";

//
// Types
//
interface OrganizationFieldProps extends UseControllerProps {
  label: string;
}

interface SerializerProps {
  value: OrganizationApiDocument | SerializerResult;
}

interface SerializerResult {
  id: string;
  name: string;
  tag: string;
}

interface DeserializerResult {
  label: string;
  value: SerializerResult;
}

//
// Components
//

/**
 * Organization fields (Nested field)
 * @param name {string} Name of the field where the data will be stored (Requires ``React Hook Form`` storage). Supports
 *                      nested names (e.g., metadata.organizations)
 * @param label {string} Name of the field in the page.
 * @param control {Control} ``React Hook Form`` control
 * @param rules {array} ``React Hook Form`` rules.
 */
export const OrganizationsField = ({
  name,
  label,
  control,
  rules,
}: OrganizationFieldProps) => {
  /**
   * Load initial data.
   */
  const { isLoading, data: initialOptions } = useQuery(
    ["field-organizations"],
    () => {
      return suggestOrganizations("").then((data) =>
        data.map((row: OrganizationApiDocument) => ({
          value: row,
          label: row.name,
        })),
      );
    },
  );

  /**
   * Load options function for the ``React Select``.
   */
  const loadOptionsFunction =
    generatePopulationFunction<OrganizationApiDocument>(
      (row: OrganizationApiDocument) => {
        return {
          label: row.name,
          value: row,
        };
      },
      suggestOrganizations,
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
          name: row.value.name,
          tag: "acronym" in row.value ? row.value.acronym : row.value.tag,
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
    <MultiSelectionFieldNested
      name={name}
      label={label}
      control={control}
      rules={rules}
      serializer={serializer}
      deserializer={deserializer}
      isLoading={isLoading}
      defaultOptions={initialOptions}
      loadOptions={loadOptionsFunction}
    />
  );
};
