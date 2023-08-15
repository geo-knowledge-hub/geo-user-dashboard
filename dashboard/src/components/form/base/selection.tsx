/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { AsyncSelect, MultiValue } from "chakra-react-select";
import { useController, UseControllerProps } from "react-hook-form";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";

//
// Types
//
interface SingleSelectionFieldProps extends UseControllerProps {
  label: string;
  serializer: (value: any | null) => any | null;
  deserializer: (value: any | undefined) => any | null;
  isLoading: any;
  defaultOptions: any;
  loadOptions: any;
}

interface MultipleSelectionFieldProps extends UseControllerProps {
  label: string;
  serializer: (values: MultiValue<any> | null) => any[] | null;
  deserializer: (values: MultiValue<any> | undefined) => any[] | null;
  isLoading: any;
  defaultOptions: any;
  loadOptions: any;
}

//
// Components
//

/**
 * Single Selection Field (Without nested field support)
 * @param name {string} Name of the field where the data will be stored (Requires ``React Hook Form`` storage)
 *                      (e.g., metadata)
 * @param control {Control} ``React Hook Form`` control
 * @param rules {array} List of rules.
 * @param label {string} Name of the field in the page.
 * @param serializer {function} Serializer function (Api Rest Document -> React Hook Form)
 * @param deserializer {function} Deserializer function (React Hook Form -> React Select)
 * @param ...props {object} Extra configurations for the ``React Select``
 */
export const SelectionFieldSimple = ({
  name,
  control,
  rules,
  label,
  serializer,
  deserializer,
  ...props
}: SingleSelectionFieldProps) => {
  /**
   * Preparing field.
   */
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { invalid, error },
  } = useController({
    control,
    name,
    rules,
  });

  return (
    <FormControl isInvalid={invalid}>
      <FormLabel>{label}</FormLabel>

      <AsyncSelect
        onChange={(newValue: any) => {
          onChange(serializer(newValue));
        }}
        onBlur={onBlur}
        ref={ref}
        value={deserializer(value)}
        {...props}
      />

      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
};

/**
 * MultiSelection Field (Without nested field support)
 * @param name {string} Name of the field where the data will be stored (Requires ``React Hook Form`` storage)
 *                      (e.g., metadata)
 * @param control {Control} ``React Hook Form`` control
 * @param rules {array} List of rules.
 * @param label {string} Name of the field in the page.
 * @param serializer {function} Serializer function (Api Rest Document -> React Hook Form)
 * @param deserializer {function} Deserializer function (React Hook Form -> React Select)
 * @param ...props {object} Extra configurations for the ``React Select``
 */
export const MultiSelectionFieldSimple = ({
  name,
  control,
  rules,
  label,
  serializer,
  deserializer,
  ...props
}: MultipleSelectionFieldProps) => {
  /**
   * Preparing field.
   */
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { invalid, error },
  } = useController({
    control,
    name,
    rules,
  });

  return (
    <FormControl isInvalid={invalid}>
      <FormLabel>{label}</FormLabel>

      <AsyncSelect
        isMulti
        onChange={(newValue: MultiValue<any>) => {
          onChange(serializer(newValue));
        }}
        onBlur={onBlur}
        ref={ref}
        value={deserializer(value)}
        {...props}
      />

      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
};

/**
 * MultiSelection Field (With nested field support)
 * @param name {string} Name of the field where the data will be stored (Requires ``React Hook Form`` storage). Supports
 *                      nested names (e.g., metadata.organizations)
 * @param control {Control} ``React Hook Form`` control
 * @param rules {array} List of rules.
 * @param label {string} Name of the field in the page.
 * @param serializer {function} Serializer function (Api Rest Document -> React Hook Form)
 * @param deserializer {function} Deserializer function (React Hook Form -> React Select)
 * @param ...props {object} Extra configurations for the ``React Select``
 */
export const MultiSelectionFieldNested = ({
  name,
  control,
  rules,
  label,
  serializer,
  deserializer,
  ...props
}: MultipleSelectionFieldProps) => {
  /**
   * Auxiliary functions.
   */
  const addNestedKey = (data: any) => ({ [field]: data });

  const getFromNestedKey = (data: any) => {
    return data !== undefined ? data[field] : data;
  };

  /**
   * Extracting nested values.
   */
  const [from, field] = name.split(".");

  /**
   * Preparing field.
   */
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { invalid, error },
  } = useController({
    name: from,
    control,
    rules,
  });

  return (
    <FormControl isInvalid={invalid}>
      <FormLabel>{label}</FormLabel>

      <AsyncSelect
        isMulti
        onChange={(newValue: MultiValue<any>) => {
          onChange({
            ...value,
            ...addNestedKey(serializer(newValue)),
          });
        }}
        onBlur={onBlur}
        ref={ref}
        value={deserializer(getFromNestedKey(value))}
        {...props}
      />

      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
};
