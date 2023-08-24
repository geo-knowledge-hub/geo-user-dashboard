/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { useEffect, useState } from "react";

import { Input, InputProps } from "@chakra-ui/react";

//
// Types
//
interface DebouncedInputProps extends InputProps {
  debounceTime: number;
  setFiltersValue: (value: string) => void;
}

//
// Components
//

/**
 * Filter Input
 * @param setFiltersValue {Function} Function to set the filter values
 * @param debounceTime {number} Debounce time.
 * @param props {object} Extra ``Input`` properties
 */
export const FilterInput = ({
  setFiltersValue,
  debounceTime,
  ...props
}: DebouncedInputProps) => {
  // State
  const [value, setValue] = useState("");

  // Auxiliary function
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFiltersValue(value);
    }, debounceTime);

    return () => clearTimeout(timeout);
  }, [debounceTime, setFiltersValue, value]);

  return (
    <Input
      onChange={(event) => {
        setValue(event.target.value);
      }}
      value={value}
      {...props}
    />
  );
};
