/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { useController, UseControllerProps } from "react-hook-form";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";

//
// Types
//
interface DateFieldProps extends UseControllerProps {
  label: string;
}

//
// Components
//

/**
 * Date Field (With selector support)
 * @param name {string} Name of the field where the data will be stored (Requires ``React Hook Form`` storage). Supports
 *                      nested names (e.g., date)
 * @param control {Control} ``React Hook Form`` control
 * @param rules {array} List of rules.
 * @param label {string} Name of the field in the page.
 */
export const DateField = ({ name, label, control, rules }: DateFieldProps) => {
  const {
    field: { onChange, value },
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
          const newDate = date ? date.toISOString().split("T")[0] : date;
          onChange(newDate);
        }}
        date={value ? new Date(value) : value}
      />

      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
};
