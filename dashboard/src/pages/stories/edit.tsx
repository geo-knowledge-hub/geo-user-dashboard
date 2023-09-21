/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";

import { IResourceComponentsProps } from "@refinedev/core";
import { Edit } from "@refinedev/chakra-ui";

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

import {
  UsersField,
  PackagesField,
  MarkdownTextField,
} from "../../components/form";

import { StorySchema, StoryType } from "./schema";

//
// Components
//

/**
 * Edit page for the ``Story`` entity.
 */
export const StoryEditPage: React.FC<IResourceComponentsProps> = () => {
  // Form
  const {
    control,
    refineCore: { formLoading },
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm<StoryType>({
    resolver: zodResolver(StorySchema),
    refineCoreProps: {
      meta: {
        populate: "*",
      },
    },
  });

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Container maxW="container.xl" mt={5}>
        <Box
          w="full"
          p={8}
          borderWidth="1px"
          borderRadius="lg"
          boxShadow={"md"}
        >
          <FormControl mb="3" isInvalid={!!(errors as any)?.id}>
            <FormLabel>Id</FormLabel>
            <Input
              disabled
              type="number"
              {...register("id", {
                required: "This field is required",
                valueAsNumber: true,
              })}
            />
            <FormErrorMessage>
              {(errors as any)?.id?.message as string}
            </FormErrorMessage>
          </FormControl>
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
    </Edit>
  );
};
