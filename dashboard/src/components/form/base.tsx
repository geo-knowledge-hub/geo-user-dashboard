/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { AsyncSelect } from "chakra-react-select";
import { useController } from "react-hook-form";

type SelectData = {
  value: number;
  label: string;
};

type ResultData = {
  id: number;
  name: string;
};

export const MultiSelectionField = ({
  control,
  name,
  label,
  rules,
  serializer,
  deserializer,
  ...props
}) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules,
  });

  const transformValue = (obj: ResultData[] | undefined) => {
    if (obj === undefined) return obj;

    return obj.map((row: ResultData) => ({
      value: row?.id,
      label: row?.name,
    }));
  };

  return (
    <FormControl isInvalid={invalid}>
      <FormLabel>{label}</FormLabel>

      <AsyncSelect
        isMulti
        onChange={(values) => {
          const processedValues =
            values !== null
              ? values.map((row: SelectData) => ({
                  id: row.value,
                  name: row.label,
                }))
              : null;

          onChange(serializer(values));
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
