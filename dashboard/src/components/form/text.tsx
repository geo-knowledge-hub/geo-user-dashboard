/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

import { useController, UseControllerProps } from "react-hook-form";

import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";

//
// Types
//
interface DescriptionProps extends UseControllerProps {
  label: string;
}

//
// Components
//

/**
 * Markdown Field (With text preview support)
 * @param name {string} Name of the field where the data will be stored (Requires ``React Hook Form`` storage)
 *                      (e.g., description)
 * @param control {Control} ``React Hook Form`` control
 * @param rules {array} List of rules.
 * @param label {string} Name of the field in the page.
 * @param defaultValue {string} Default value for the field.
 */
export const MarkdownTextField = ({
  name,
  control,
  rules,
  label,
  defaultValue,
}: DescriptionProps) => {
  const {
    field: { onChange, value },
    fieldState: { invalid, error },
  } = useController({
    control,
    name,
    rules,
    defaultValue,
  });

  return (
    <FormControl isInvalid={invalid}>
      <FormLabel>{label}</FormLabel>

      <MDEditor
        value={value}
        onChange={onChange}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        preview={"live"}
      />

      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
};
