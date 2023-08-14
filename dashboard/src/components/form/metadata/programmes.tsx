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
import { suggestProgramme } from "../../../resources/gkhub";

//
// Types
//
interface ProgrammeFieldProps extends UseControllerProps {
  label: string;
}

interface SerializerProps {
  value: ProgrammeApiDocument | SerializerResult;
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
export const ProgrammeField = ({
  name,
  label,
  control,
  rules,
}: ProgrammeFieldProps) => {
  /**
   * Load initial data.
   */
  const { isLoading, data: initialOptions } = useQuery(
    ["field-programme"],
    () => {
      return suggestProgramme("").then((data) =>
        data.map((row: ProgrammeApiDocument) => ({
          value: row,
          label: row.title.en,
        })),
      );
    },
  );

  /**
   * Load options function for the ``React Select``.
   */
  const loadOptionsFunction = generatePopulationFunction<ProgrammeApiDocument>(
    (row: ProgrammeApiDocument) => {
      return {
        label: row.title.en,
        value: row,
      };
    },
    suggestProgramme,
  );

  /**
   * Serializer (Api Rest Document -> React Hook Form)
   */
  const serializer = (
    values: MultiValue<SerializerProps> | null,
  ): SerializerResult[] | null => {
    return values !== null
      ? values.map((row) => ({
          name: "title" in row.value ? row.value.title.en : row.value.name,
          tag: "props" in row.value ? row.value.props.acronym : row.value.tag,
          id: row.value.id,
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
