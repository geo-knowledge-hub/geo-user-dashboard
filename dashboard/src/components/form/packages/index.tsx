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
import {
  Control,
  FieldError,
  UseFieldArrayProps,
  useFieldArray,
} from "react-hook-form";

import { PackageSelector } from "./selector";

//
// Data Types and Interfaces
//
interface PackageFieldProps {
  control: Control<KnowledgePackage>;
  name: string;
  label: string;
  rules?: UseFieldArrayProps<KnowledgePackage>["rules"];
  error: FieldError;
}

//
// Components
//
export const PackagesField = ({
  control,
  name,
  label,
  rules,
  error,
}: PackageFieldProps) => {
  // States
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { fields, append, remove } = useFieldArray<KnowledgePackage>({
    control: control,
    name: name,
  });

  // Auxiliary functions
  const handleMultipleAdditions = (packages: KnowledgePackage[]) => {
    packages.forEach(({ id, pid, metadata }) => {
      append({
        id,
        name: metadata.title,
      });
    });
  };

  const handleDeletion = (pkg: KnowledgePackage) => {
    const pkgIndex = fields.indexOf(pkg);

    remove(pkgIndex);
  };

  // Let's start with the selection of the Knowledge Packages
  return (
    <FormControl mt="5">
      <Flex justifyContent={"space-between"} mb={"5"}>
        <FormLabel>{label}</FormLabel>

        <Button leftIcon={<IconPlus />} size={"xs"} onClick={onOpen}>
          Add
        </Button>
      </Flex>

      {fields.length > 0 && (
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
