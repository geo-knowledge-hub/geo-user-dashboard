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
} from "@chakra-ui/react";

import { z } from "zod";
import { useForm } from "@refinedev/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CountriesField,
  DateField,
  OrganizationsField,
  ProgrammeField,
  PackagesField,
} from "../../components/form";

import { UserSchema } from "./schema";

//
// Data types
//
type UserApplicationType = z.infer<typeof UserSchema>;

//
// Components
//

export const UserEditPage: React.FC<IResourceComponentsProps> = () => {
  // Form
  const {
    control,
    refineCore: { formLoading },
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm<UserApplicationType>({
    resolver: zodResolver(UserSchema),
  });

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
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
        <DateField
          name="usage_date"
          label="Application usage date"
          control={control}
          rules={[]}
        />
      </Box>

      <Box mb={"3"}>
        <CountriesField
          from="metadata"
          field="countries"
          label="Country"
          control={control}
          rules={[]}
        />
      </Box>

      <Box mb={"3"}>
        <OrganizationsField
          from="metadata"
          field="organizations"
          label="Organizations"
          control={control}
          rules={[]}
        />
      </Box>

      <Box mb={"3"}>
        <ProgrammeField
          from="metadata"
          field="programmes"
          label="GEO Work Programme activities"
          control={control}
          rules={[]}
        />
      </Box>

      <Box mb={"3"}>
        <PackagesField
          from="metadata"
          field="packages"
          label={"Knowledge Packages"}
          control={control}
          error={errors?.metadata?.packages}
        />
      </Box>
    </Edit>
  );
};
