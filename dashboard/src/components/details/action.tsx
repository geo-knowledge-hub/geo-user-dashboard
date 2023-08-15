/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import { Tag, TagLabel, TagProps } from "@chakra-ui/react";

//
// Types
//
interface ActionTagProps extends TagProps {
  text: string;
}

//
// Components
//

/**
 * Action status tag.
 * @param text {string} Text to be used in the tag.
 * @param ...props {object} Parameters for the Chakra UI Tag component.
 */
export const ActionTag = ({ text, children, ...props }: ActionTagProps) => {
  return (
    <Tag {...props}>
      {children}
      <TagLabel>{text}</TagLabel>
    </Tag>
  );
};
