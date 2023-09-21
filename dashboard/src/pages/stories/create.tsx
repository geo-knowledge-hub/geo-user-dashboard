/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";

import { Create } from "@refinedev/chakra-ui";
import { IResourceComponentsProps } from "@refinedev/core";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Box,
  Container,
} from "@chakra-ui/react";

import { useForm } from "@refinedev/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { StorySchema, StoryType } from "./schema";
import { CompetenciesFieldTemplate } from "./templates";
import {
  UsersField,
  PackagesField,
  MarkdownTextField,
} from "../../components/form";

//
// Components
//

/**
 * Creation page for the ``Story`` entity.
 */
export const StoryCreatePage: React.FC<IResourceComponentsProps> = () => {
  /**
   * Prepare form
   */
  const {
    control,
    refineCore: { formLoading },
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm<StoryType>({
    resolver: zodResolver(StorySchema),
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Container maxW="container.xl" mt={5}>
        <Box
          w="full"
          p={8}
          borderWidth="1px"
          borderRadius="lg"
          boxShadow={"md"}
        >
          <Box mb={"3"}>
            <UsersField
              name={"application_users"}
              label="Associated Users"
              control={control}
            />
          </Box>

          <FormControl mb="3" isInvalid={!!(errors as any)?.email}>
            <FormLabel>Title</FormLabel>
            <Input
              type="title"
              {...register("title", {
                required: "This field is required",
              })}
            />
            <FormErrorMessage>
              {(errors as any)?.title?.message as string}
            </FormErrorMessage>
          </FormControl>

          <Box mb={"3"}>
            <MarkdownTextField
              control={control}
              name={"description"}
              label={"Description"}
            />
          </Box>

          <Box mb={"3"}>
            <MarkdownTextField
              control={control}
              name={"experiences"}
              label={"Experiences"}
            />
          </Box>

          <Box mb={"3"}>
            <MarkdownTextField
              control={control}
              name={"competencies"}
              label={"Competencies required"}
              defaultValue={CompetenciesFieldTemplate}
            />
          </Box>

          <Box mb={"3"}>
            <PackagesField
              name={"metadata.packages"}
              label={"Knowledge Packages"}
              control={control}
            />
          </Box>
        </Box>
      </Container>
    </Create>
  );
};
