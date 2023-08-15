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
} from "@chakra-ui/react";

import { IconChevronDown } from "@tabler/icons";

import { ListPagination } from "../../components/list";

import { StoryUserType } from "./schema";
import _truncate from "lodash/truncate";

/**
 * List page for the ``Story`` entity.
 */
export const StoryListPage: React.FC<IResourceComponentsProps> = () => {
  // Constants
  const textColor = useColorModeValue("gray.700", "white");

  // Hooks
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "title",
        accessorKey: "title",
        header: "Title",
        cell: function render({ getValue }) {
          const storyTitle = getValue<string>();

          return <>{storyTitle}</>;
        },
      },
      {
        id: "user",
        accessorKey: "application_users",
        header: "User",
        cell: function render({ getValue }) {
          const applicationUsers = getValue<StoryUserType[]>();
          const firstUserName = _truncate(applicationUsers[0].name, {
            length: 50,
          });

          return (
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
                {applicationUsers.map((user: StoryUserType, idx: number) => (
                  <MenuItem key={idx}>{user.name}</MenuItem>
                ))}
              </MenuList>
            </Menu>
          );
        },
      },
      {
        id: "updatedAt",
        accessorKey: "updatedAt",
        header: "Last update",
        cell: function render({ getValue }) {
          const date = getValue<string>();
          const storyLastUpdate = new Date(date).toDateString();

          return <>{storyLastUpdate}</>;
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
              Stories
            </Text>
            <CreateButton />
          </Flex>
        </CardHeader>
        <CardBody overflowX={{ sm: "scroll", md: "scroll", xl: "hidden" }}>
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
                    <Td key={cell.id} maxWidth={"15em"}>
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
