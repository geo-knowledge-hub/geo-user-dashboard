/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import {
  usePagination,
  EditButton,
  ShowButton,
  DeleteButton,
  DateField,
} from "@refinedev/chakra-ui";
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  HStack,
  Button,
  IconButton,
  Box,
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
  Flex,
  Card,
  CardHeader,
  Text,
  CardBody,
  useColorModeValue,
  Avatar,
} from "@chakra-ui/react";

import {
  IconChevronRight,
  IconChevronLeft,
  IconChevronDownRight,
  IconChevronDown,
} from "@tabler/icons";

import ReactCountryFlag from "react-country-flag";

export const UserListPage: React.FC<IResourceComponentsProps> = () => {
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: "Name",
        cell: function render({ row }) {
          const name = row.original.name;
          const email = row.original.email;

          return (
            <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
              <Avatar name={name} w="50px" borderRadius="12px" me="18px" />
              <Flex direction="column">
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  minWidth="100%"
                >
                  {name}
                </Text>
                <Text fontSize="sm" color="gray.400" fontWeight="normal">
                  <a href={`mailto:${email}`}>{email}</a>
                </Text>
              </Flex>
            </Flex>
          );
        },
      },
      {
        id: "gwp",
        accessorKey: "metadata.programmes",
        header: "GEO Programme",
        cell: function render({ getValue }) {
          const programmes = getValue<any>();

          return (
            <Menu>
              <MenuButton
                as={Button}
                variant={"outline"}
                rightIcon={<IconChevronDownRight />}
                size={"sm"}
                fontWeight={"normal"}
              >
                {programmes[0].tag}
              </MenuButton>
              <MenuList>
                {programmes.map((programme: any, idx: number) => (
                  <MenuItem key={idx}>{programme.name}</MenuItem>
                ))}
              </MenuList>
            </Menu>
          );
        },
      },
      {
        id: "organizations",
        accessorKey: "metadata.organizations",
        header: "Organizations",
        cell: function render({ getValue }) {
          const programmes = getValue<any>();

          return (
            <Menu>
              <MenuButton
                as={Button}
                variant={"outline"}
                rightIcon={<IconChevronDownRight />}
                size={"sm"}
                fontWeight={"normal"}
              >
                {programmes[0].tag}
              </MenuButton>
              <MenuList>
                {programmes.map((programme: any, idx: number) => (
                  <MenuItem key={idx}>{programme.name}</MenuItem>
                ))}
              </MenuList>
            </Menu>
          );
        },
      },
      {
        id: "countries",
        accessorKey: "metadata.countries",
        header: "Countries",
        cell: function render({ getValue }) {
          const countriesData = getValue<any>();

          const countries = countriesData.map((country: any, idx: number) => {
            const name = country.name;
            const tag = country.tag.toUpperCase();

            return (
              <MenuItem key={idx} _focus={{}}>
                <HStack>
                  <Box>
                    <ReactCountryFlag countryCode={tag} svg />
                  </Box>
                  <Box>{name}</Box>
                </HStack>
              </MenuItem>
            );
          });

          return (
            <Menu>
              <MenuButton
                as={Button}
                variant={"outline"}
                rightIcon={<IconChevronDownRight />}
                size={"sm"}
              >
                {countries[0]}
              </MenuButton>
              <MenuList>{countries}</MenuList>
            </Menu>
          );
        },
      },
      {
        id: "updated_at",
        accessorKey: "updated_at",
        header: "Updated",
        cell: function render({ getValue }) {
          return <DateField value={getValue<any>()} />;
        },
      },
      {
        id: "actions",
        accessorKey: "id",
        header: "Actions",
        cell: function render({ getValue }) {
          return (
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<IconChevronDown />}
                variant={"outline"}
              >
                Actions
              </MenuButton>
              <MenuList>
                <HStack justify={"space-around"}>
                  <ShowButton hideText recordItemId={getValue() as string} />
                  <EditButton hideText recordItemId={getValue() as string} />
                  <DeleteButton hideText recordItemId={getValue() as string} />
                </HStack>
              </MenuList>
            </Menu>
          );
        },
      },
    ],
    [],
  );

  const {
    getHeaderGroups,
    getRowModel,
    setOptions,
    refineCore: {
      setCurrent,
      pageCount,
      current,
      tableQueryResult: { data: tableData },
    },
  } = useTable({
    columns,
    refineCoreProps: {
      meta: {
        populate: "*",
      },
    },
  });

  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
    },
  }));

  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Flex direction={"column"}>
      <Card overflowX={{ sm: "scroll", md: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px">
          <Text
            fontSize="xl"
            color={textColor}
            fontWeight="bold"
            marginLeft="20px"
            marginTop="20px"
          >
            Application Users
          </Text>
        </CardHeader>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              {getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id} my=".8rem" pl="0px" color="gray.400">
                  {headerGroup.headers.map((header) => (
                    <Th key={header.id}>
                      {!header.isPlaceholder &&
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {getRowModel().rows.map((row) => (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Flex>
  );
};

type PaginationProps = {
  current: number;
  pageCount: number;
  setCurrent: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  current,
  pageCount,
  setCurrent,
}) => {
  const pagination = usePagination({
    current,
    pageCount,
  });

  return (
    <Box display="flex" justifyContent="flex-end">
      <HStack my="3" spacing="1">
        {pagination?.prev && (
          <IconButton
            aria-label="previous page"
            onClick={() => setCurrent(current - 1)}
            disabled={!pagination?.prev}
            variant="outline"
          >
            <IconChevronLeft size="18" />
          </IconButton>
        )}

        {pagination?.items.map((page) => {
          if (typeof page === "string") return <span key={page}>...</span>;

          return (
            <Button
              key={page}
              onClick={() => setCurrent(page)}
              variant={page === current ? "solid" : "outline"}
            >
              {page}
            </Button>
          );
        })}
        {pagination?.next && (
          <IconButton
            aria-label="next page"
            onClick={() => setCurrent(current + 1)}
            variant="outline"
          >
            <IconChevronRight size="18" />
          </IconButton>
        )}
      </HStack>
    </Box>
  );
};
