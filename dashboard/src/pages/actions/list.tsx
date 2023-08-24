/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";

import { useTable } from "@refinedev/react-table";
import { IResourceComponentsProps } from "@refinedev/core";
import { ColumnDef, flexRender } from "@tanstack/react-table";

import {
  EditButton,
  ShowButton,
  DeleteButton,
  CreateButton,
} from "@refinedev/chakra-ui";

import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
  Flex,
  Card,
  CardHeader,
  Text,
  CardBody,
  ButtonGroup,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";

import _truncate from "lodash/truncate";
import { IconChevronDown } from "@tabler/icons";

import { ListPagination } from "../../components/list";
import { ActionTag } from "../../components/details";
import { FilterInput } from "../../components/form";
import { buildConditionalFilter } from "../../toolbox";

export const UserListPage: React.FC<IResourceComponentsProps> = () => {
  // Constants
  const textColor = useColorModeValue("gray.700", "white");

  // Filter fields
  const filterFields = [
    "title",
    "description",
    "type.name",
    "status.name",
    "application_users.name",
    "application_users.email",
  ];

  // Hooks
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "title",
        accessorKey: "title",
        header: "Title",
        cell: function render({ getValue }) {
          const storyTitle = getValue<string>();

          return <Text>{storyTitle}</Text>;
        },
      },
      {
        id: "type",
        accessorKey: "type",
        header: "Type",
        cell: function render({ getValue }) {
          const actionType = getValue<ActionMetadata>();

          return (
            <ActionTag text={actionType.name} colorScheme={actionType.color} />
          );
        },
      },
      {
        id: "status",
        accessorKey: "status",
        header: "Status",
        cell: function render({ getValue }) {
          const actionStatus = getValue<ActionMetadata>();

          return (
            <ActionTag
              text={actionStatus.name}
              colorScheme={actionStatus.color}
            />
          );
        },
      },
      {
        id: "user",
        accessorKey: "application_users",
        header: "Users",
        cell: function render({ getValue }) {
          const applicationUsers = getValue<ApplicationUser[]>();
          const firstUserName = _truncate(applicationUsers[0].name, {
            length: 50,
          });

          return (
            <Box maxWidth={"20em"}>
              <Menu>
                <MenuButton
                  as={Button}
                  variant={"outline"}
                  rightIcon={<IconChevronDown />}
                  size={"sm"}
                  fontWeight={"normal"}
                  w={"full"}
                >
                  <p>{firstUserName}</p>
                </MenuButton>
                <MenuList>
                  {applicationUsers.map(
                    (user: ApplicationUser, idx: number) => (
                      <MenuItem key={idx}>{user.name}</MenuItem>
                    ),
                  )}
                </MenuList>
              </Menu>
            </Box>
          );
        },
      },
      {
        id: "actions",
        accessorKey: "id",
        header: "Actions",
        cell: function render({ getValue }) {
          return (
            <ButtonGroup size={"sm"}>
              <ShowButton hideText recordItemId={getValue() as string} />
              <EditButton hideText recordItemId={getValue() as string} />
              <DeleteButton hideText recordItemId={getValue() as string} />
            </ButtonGroup>
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
    refineCore: { setCurrent, pageCount, current, setFilters },
  } = useTable({
    columns,
    refineCoreProps: {
      meta: {
        populate: "*",
      },
    },
  });

  // Auxiliary functions
  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
    },
  }));

  return (
    <Flex direction={"column"}>
      <Card>
        <CardHeader p="6px 0px 22px 0px">
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            marginLeft="20px"
            marginRight={"20px"}
            marginTop="20px"
          >
            <Text fontSize="xx-large" color={textColor} fontWeight="bold">
              Actions
            </Text>
            <CreateButton />
          </Flex>
        </CardHeader>
        <Box padding={5}>
          <FilterInput
            debounceTime={300}
            setFiltersValue={(value) => {
              setFilters([
                buildConditionalFilter(filterFields, "contains", value),
              ]);
            }}
            placeholder={"Type to search for actions"}
          />
        </Box>
        <CardBody overflowX={{ sm: "scroll", md: "scroll", xl: "hidden" }}>
          <Table variant="simple" color={textColor} size={"lg"}>
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
                    <Td key={cell.id} maxWidth={"17em"}>
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
          <ListPagination
            current={current}
            pageCount={pageCount}
            setCurrent={setCurrent}
          />
        </CardBody>
      </Card>
    </Flex>
  );
};
