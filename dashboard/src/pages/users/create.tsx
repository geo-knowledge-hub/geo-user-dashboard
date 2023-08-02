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
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";
import { SingleDatepicker } from "chakra-dayzed-datepicker";

const DatePicker = ({
  name,
  register,
  ...registerConfig
}: {
  name: string;
  register: Function;
  registerConfig: object;
}) => {
  const inputData: { name: string; onChange: { (date: Date): void } } = {
    ...register(name, { ...registerConfig }),
  };

  return (
    <SingleDatepicker name={inputData.name} onDateChange={inputData.onChange} />
  );
};

export const UserCreatePage: React.FC<IResourceComponentsProps> = () => {
  const {
    refineCore: { formLoading },
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm();

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <FormControl mb="3" isInvalid={!!(errors as any)?.name}>
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

      {/* 
                    DatePicker component is not included in "@refinedev/chakra-ui" package.
                    To use a <DatePicker> component, you can examine the following links:
                    
                    - https://github.com/aboveyunhai/chakra-dayzed-datepicker
                    - https://github.com/wojtekmaj/react-date-picker
                */}
      <FormControl mb="3" isInvalid={!!(errors as any)?.usage_date}>
        <FormLabel>Usage Date</FormLabel>

        <DatePicker
          name="usage_date"
          register={register}
          registerConfig={{
            required: "This field is required",
          }}
        />
        <FormErrorMessage>
          {(errors as any)?.usage_date?.message as string}
        </FormErrorMessage>
      </FormControl>
    </Create>
  );
};
