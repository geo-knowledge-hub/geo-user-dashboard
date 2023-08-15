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
  HStack,
} from "@chakra-ui/react";

import { useForm } from "@refinedev/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  UsersField,
  ActionTypeField,
  ActionStatusField,
  MarkdownTextField,
} from "../../components/form";

import { ActionSchema, ActionType } from "./schema";

//
// Components
//

/**
 * Creation page for the ``Action`` entity.
 */
export const ActionCreatePage: React.FC<IResourceComponentsProps> = () => {
  /**
   * Prepare form
   */
  const {
    control,
    refineCore: { formLoading },
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm<ActionType>({
    resolver: zodResolver(ActionSchema),
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
          <FormControl mb={"3"} isInvalid={!!errors?.title}>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              {...register("title", {
                required: "Title is required",
              })}
            />
            <FormErrorMessage>
              {(errors as any)?.title?.message as string}
            </FormErrorMessage>
          </FormControl>

          <HStack spacing={2} mb={3} w={"full"}>
            <Box w={"full"}>
              <ActionTypeField
                name={"type"}
                label="Action Type"
                control={control}
              />
            </Box>
            <Box w={"full"}>
              <ActionStatusField
                name={"status"}
                label="Status"
                control={control}
              />
            </Box>
          </HStack>

          <Box mb={"3"}>
            <MarkdownTextField
              control={control}
              name={"description"}
              label={"Description"}
            />
          </Box>

          <Box mb={"3"}>
            <UsersField
              name={"application_users"}
              label="Associated Users"
              control={control}
            />
          </Box>
        </Box>
      </Container>
    </Create>
  );
};
