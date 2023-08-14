/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";

import { Edit } from "@refinedev/chakra-ui";
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

import {
  CountriesField,
  OrganizationsField,
  ProgrammeField,
} from "../../components/form";

import { KnowledgeProviderSchema, KnowledgeProviderType } from "./schema";

//
// Components
//

/**
 * Edit page for the ``Knowledge Provider`` entity.
 */
export const ProviderEditPage: React.FC<IResourceComponentsProps> = () => {
  // Form
  const {
    control,
    refineCore: { formLoading },
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm<KnowledgeProviderType>({
    resolver: zodResolver(KnowledgeProviderSchema),
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

          <FormControl mb={"3"} isInvalid={!!errors?.name}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              {...register("name", {
                required: "This field is required",
              })}
            />
            <FormErrorMessage>
              {(errors as any)?.name?.message as string}
            </FormErrorMessage>
          </FormControl>

          <FormControl mb="3" isInvalid={!!(errors as any)?.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              {...register("email", {
                required: "This field is required",
              })}
            />
            <FormErrorMessage>
              {(errors as any)?.email?.message as string}
            </FormErrorMessage>
          </FormControl>

          <Box mb={"3"}>
            <CountriesField
              name={"metadata.countries"}
              label="Country"
              control={control}
            />
          </Box>

          <Box mb={"3"}>
            <OrganizationsField
              name={"metadata.organizations"}
              label="Organizations"
              control={control}
            />
          </Box>

          <Box mb={"3"}>
            <ProgrammeField
              name={"metadata.programmes"}
              label="GEO Work Programme activities"
              control={control}
            />
          </Box>
        </Box>
      </Container>
    </Edit>
  );
};
