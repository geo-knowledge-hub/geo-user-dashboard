/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";

import {
  Control,
  FieldError,
  UseFieldArrayProps,
  useController,
} from "react-hook-form";

import { IconPlus, IconTrash } from "@tabler/icons";

import { PackageSelector } from "./selector";

//
// Data Types and Interfaces
//
interface PackageFieldProps {
  control: Control<KnowledgePackage>;
  from: string;
  field: string;
  label: string;
  rules?: UseFieldArrayProps<KnowledgePackage>["rules"];
  error: FieldError;
}

//
// Components
//
export const PackagesField = ({
  control,
  from,
  field,
  label,
  rules,
}: PackageFieldProps) => {
  // States
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { invalid, error },
  } = useController({
    name: from,
    control,
    rules,
  });

  // Auxiliary functions
  const addNestedKey = (data: any) => ({ [field]: data });

  const getFromNestedKey = (data: any) => {
    const nestedValue = data !== undefined ? data[field] : [];

    return nestedValue !== undefined ? nestedValue : [];
  };

  const append = (data: KnowledgePackageRepresentation) => {
    const currentValue = getFromNestedKey(value);
    const newValue = [...currentValue, data];

    // @ts-ignore
    onChange({ ...value, ...addNestedKey(newValue) });
  };

  const remove = (data: KnowledgePackageRepresentation) => {
    const currentValue = getFromNestedKey(value);
    const newValue = currentValue.filter(
      (row: KnowledgePackage) => row.id !== data.id,
    );

    // @ts-ignore
    onChange({ ...value, ...addNestedKey(newValue) });
  };

  // Auxiliary functions
  const handleMultipleAdditions = (
    packages: KnowledgePackage[] | KnowledgePackageRepresentation[],
  ) => {
    packages.forEach(({ id, name, metadata }) => {
      append({
        id,
        name: name || metadata.title,
      });
    });
  };

  const handleDeletion = (
    pkg: KnowledgePackage | KnowledgePackageRepresentation,
  ) => {
    remove(pkg);
  };

  const fields: KnowledgePackageRepresentation[] = getFromNestedKey(value);

  return (
    <FormControl mt="5">
      <Flex justifyContent={"space-between"} mb={"5"}>
        <FormLabel>{label}</FormLabel>

        <Button leftIcon={<IconPlus />} size={"xs"} onClick={onOpen}>
          Add
        </Button>
      </Flex>

      {fields && fields.length > 0 && (
        <VStack
          padding={"2"}
          maxH={"80"}
          borderRadius={"5"}
          overflowY={"scroll"}
          border={"0.1px solid #e1e1e1"}
        >
          {fields.map((pkg) => (
            <Flex
              key={pkg.id}
              justifyContent={"space-between"}
              w={"100%"}
              padding={"5"}
              alignItems={"center"}
              boxShadow={"base"}
              borderRadius={"5"}
            >
              <Text>{pkg.name}</Text>
              <Flex>
                <IconButton
                  aria-label="Remove package"
                  icon={<IconTrash size={"15"} />}
                  colorScheme={"red"}
                  size={"xs"}
                  onClick={() => {
                    handleDeletion(pkg);
                  }}
                />
              </Flex>
            </Flex>
          ))}
        </VStack>
      )}

      <FormErrorMessage>{error && error.message}</FormErrorMessage>

      <PackageSelector
        title="Package selector"
        isOpen={isOpen}
        onClose={onClose}
        formPackages={fields}
        handleAddition={handleMultipleAdditions}
      />
    </FormControl>
  );
};
