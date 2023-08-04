/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { useController } from "react-hook-form";

export const DateField = ({ control, name, label, rules, ...props }) => {
  const {
    field: { onChange, value, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <FormControl isInvalid={invalid}>
      <FormLabel>{label}</FormLabel>

      <SingleDatepicker
        name={name}
        onDateChange={(date) => {
          onChange(date ? date.toISOString().split("T")[0] : date);
        }}
        date={value ? new Date(value) : value}
        {...props}
      />

      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
};
