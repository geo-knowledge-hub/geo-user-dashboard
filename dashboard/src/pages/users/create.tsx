/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { IResourceComponentsProps } from "@refinedev/core";

import { Create } from "@refinedev/chakra-ui";

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
} from "../../components/form";

import { UserSchema } from "./schema";
import { PackagesField } from "../../components/form/packages";

//
// Data types
//
type UserApplicationType = z.infer<typeof UserSchema>;

//
// Components
//

/**
 * User creation page component
 * @returns React.FC
 */
export const UserCreatePage: React.FC<IResourceComponentsProps> = () => {
  // Data
  const {
    control,
    refineCore: { formLoading },
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm<UserApplicationType>({
    resolver: zodResolver(UserSchema),
  });

  console.log(errors);

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <form>
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
          <OrganizationsField
            path="metadata.organizations"
            label="Organizations"
            control={control}
            rules={[]}
          />
        </Box>

        <Box mb={"3"}>
          <ProgrammeField
            path="metadata.programmes"
            label="GEO Work Programme activities"
            control={control}
            rules={[]}
          />
        </Box>

        <Box mb={"3"}>
          <CountriesField
            path="metadata.countries"
            label="Country"
            control={control}
            rules={[]}
          />
        </Box>

        <Box mb={"3"}>
          <PackagesField
            name={"metadata.packages"}
            label={"Knowledge Packages"}
            control={control}
            error={errors?.metadata?.packages}
          />
        </Box>
      </form>
    </Create>
  );
};
