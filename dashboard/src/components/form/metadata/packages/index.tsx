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
import { IconPlus, IconTrash } from "@tabler/icons";

import { useController, UseControllerProps } from "react-hook-form";

import { PackageSelector } from "./selector";

//
// Types
//
interface PackageFieldProps extends UseControllerProps {
  label: string;
}

interface PackageForm {
  id: string;
  name?: string;
  metadata?: {
    title: string;
  };
}

//
// Components
//

/**
 * Knowledge Package field (Nested field)
 * @param name {string} Name of the field where the data will be stored (Requires ``React Hook Form`` storage). Supports
 *                      nested names (e.g., metadata.packages)
 * @param label {string} Name of the field in the page.
 * @param control {Control} ``React Hook Form`` control
 * @param rules {array} ``React Hook Form`` rules.
 */
export const PackagesField = ({
  name,
  label,
  control,
  rules,
}: PackageFieldProps) => {
  /**
   * Field functions.
   */
  const addNestedKey = (data: any) => ({ [field]: data });

  const getFromNestedKey = (data: any) => {
    const nestedValue = data !== undefined ? data[field] : [];

    return nestedValue !== undefined ? nestedValue : [];
  };

  /**
   * Extracting nested values.
   */
  const [from, field] = name.split(".");

  /**
   * States.
   */
  const { isOpen, onOpen, onClose } = useDisclosure();

  /**
   * Preparing field.
   */
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name: from,
    control,
    rules,
  });

  /**
   * Function to append packages in the field.
   */
  const append = (data: KnowledgePackageRepresentation[]) => {
    const currentValue = getFromNestedKey(value);
    const newValue = [...currentValue, ...data];

    onChange({ ...value, ...addNestedKey(newValue) });
  };

  /**
   * Function to remove packages from the field.
   */
  const remove = (data: KnowledgePackageRepresentation) => {
    const currentValue = getFromNestedKey(value);
    const newValue = currentValue.filter(
      (row: KnowledgePackage) => row.id !== data.id,
    );

    onChange({ ...value, ...addNestedKey(newValue) });
  };

  /**
   * Wrapper of the ``append`` operation.
   */
  const handleMultipleAdditions = (
    packages: KnowledgePackage[] | KnowledgePackageRepresentation[],
  ) => {
    const handledPackages = packages.map(({ id, name, metadata }: PackageForm) => ({
      id,
      name: name || metadata?.title,
    }));

    append(handledPackages)
  };

  /**
   * Wrapper of the ``remove`` operation.
   */
  const handleDeletion = (
    pkg: KnowledgePackage | KnowledgePackageRepresentation,
  ) => {
    remove(pkg);
  };

  /**
   * Available data.
   */
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
