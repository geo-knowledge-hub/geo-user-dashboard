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

import { MultiSelectionFieldNested } from "../base";
import { generatePopulationFunction } from "../toolbox";
import { suggestCountries } from "../../../resources/manager";

//
// Types
//
interface CountryFieldProps extends UseControllerProps {
  label: string;
}

interface SerializerProps {
  value: CountryApiDocument | SerializerResult;
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
 * Countries field (Nested field)
 * @param name {string} Name of the field where the data will be stored (Requires ``React Hook Form`` storage). Supports
 *                      nested names (e.g., metadata.countries)
 * @param label {string} Name of the field in the page.
 * @param control {Control} ``React Hook Form`` control
 * @param rules {array} ``React Hook Form`` rules.
 */
export const CountriesField = ({
  name,
  label,
  control,
  rules,
}: CountryFieldProps) => {
  /**
   * Load initial data.
   */
  const { isLoading, data: initialOptions } = useQuery(
    ["field-countries"],
    () => {
      return suggestCountries("").then((data) =>
        data.map((row) => ({
          label: row.attributes.name,
          value: { id: row.id, ...row.attributes },
        })),
      );
    },
  );

  /**
   * Load options function for the ``React Select``.
   */
  const loadOptionsFunction = generatePopulationFunction<CountryApiDocument>(
    (row: CountryApiDocument) => {
      return {
        label: row.attributes.name,
        value: row,
      };
    },
    suggestCountries,
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
              ? row.value.attributes.name
              : row.value.name,
          tag:
            "attributes" in row.value
              ? row.value.attributes.tag
              : row.value.tag,
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
      <MultiSelectionFieldNested
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
