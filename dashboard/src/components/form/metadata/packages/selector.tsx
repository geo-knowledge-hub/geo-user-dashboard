/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { useState } from "react";

import {
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Tag,
  Text,
  VStack,
  Select,
  ButtonGroup,
  useToast,
} from "@chakra-ui/react";

import _upperFirst from "lodash/upperFirst";

import { useQuery } from "react-query";
import {
  IconChevronLeft,
  IconChevronRight,
  IconDeviceFloppy,
  IconSearch,
} from "@tabler/icons";

import { searchPackages } from "../../../../resources/gkhub";

//
// Constants
//
const PAGINATION_SIZES = [5, 10, 15];

//
// Types
//
interface PackageSelectorProps {
  title: string;
  isOpen: boolean;
  formPackages: KnowledgePackageRepresentation[];

  onClose: () => void;
  handleAddition: (packages: KnowledgePackage[]) => void;
}

interface PackageItemProps {
  data: KnowledgePackage;
  alreadyAdded: boolean;
  handleSelection: (pkg: KnowledgePackage) => void;
  handleDeletion: (pkg: KnowledgePackage) => void;
}

interface SizeSelectorProps {
  onChange: (size: number) => void;
}

interface PaginationProps {
  currentPage: number;
  totalRecords: number;
  size: number;
  hasPrevious: boolean;
  hasNext: boolean;
  onChange: (page: number) => void;
}

//
// Components
//

/**
 * Package Item component.
 * @param data {string} Knowledge Package data.
 * @param alreadyAdded {boolean} Flag indicating if the package was already added in the form.
 * @param handleSelection {function} Function to handle the ``select package`` operation.
 * @param handleDeletion {function} Function to handle the ``delete package`` operation.
 */
const PackageItem = ({
  data,
  alreadyAdded,
  handleSelection,
  handleDeletion,
}: PackageItemProps) => {
  /**
   * States.
   */
  const [isSelected, setIsSelected] = useState(false);

  /**
   * Preparing data to render.
   */
  const packageStatus = _upperFirst(data.status);

  const packageCreators = data.metadata.creators
    .map((row) => row.person_or_org.name)
    .join("; ");

  const packageUpdateDate = new Date(data.updated).toDateString();

  return (
    <Flex
      gap={2}
      width={"100%"}
      padding={5}
      boxShadow={"base"}
      height={"150"}
      alignItems={"center"}
    >
      <Flex flexDirection={"column"} gap={5} width={"100%"}>
        <Flex justifyContent={"space-between"}>
          <Heading
            fontSize={"sm"}
            as={"a"}
            href={data.links.self_html}
            target="_blank"
            _hover={{ color: "blue.700" }}
          >
            {data.metadata.title}
          </Heading>
          <Tag size={"sm"} colorScheme="green">
            {packageStatus}
          </Tag>
        </Flex>

        <Text color={"gray.600"} fontSize={"sm"}>
          {packageCreators}
        </Text>

        <Flex justifyContent={"space-between"}>
          <Flex gap={2}>
            {alreadyAdded ? (
              <Button
                colorScheme="yellow"
                size={"xs"}
                _hover={{ color: "unset" }}
              >
                Already added
              </Button>
            ) : (
              <Button
                colorScheme={isSelected ? "green" : "gray"}
                onClick={() => {
                  const newState = !isSelected;
                  const operation = newState ? handleSelection : handleDeletion;

                  operation(data);
                  setIsSelected(!isSelected);
                }}
                size={"xs"}
              >
                {isSelected ? "Selected" : "Select"}
              </Button>
            )}
          </Flex>
          <Text color="gray.400" fontSize={"xs"}>
            Updated on {packageUpdateDate}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

/**
 * Pagination: Size selector component
 * @param onChange {function} Function to change the size of pagination.
 */
const SizeSelector = ({ onChange }: SizeSelectorProps) => {
  return (
    <Select size={"xs"} onChange={(e) => onChange(Number(e.target.value))}>
      {PAGINATION_SIZES.map((size) => (
        <option key={size} value={size}>
          {size}
        </option>
      ))}
    </Select>
  );
};

/**
 * Pagination: Page selector.
 * @param currentPage {number} Current pagination page.
 * @param totalRecords {number} Total number of pages.
 * @param size {number} Size of the pagination page.
 * @param hasPrevious {boolean} Flag indicating if pages before ``currentPage`` are available.
 * @param hasNext {boolean} Flag indicating if pages after ``currentPage`` are available.
 * @param onChange {function} Function to handle page modifications.
 */
const PaginationSelector = ({
  currentPage,
  totalRecords,
  size,
  hasPrevious,
  hasNext,
  onChange,
}: PaginationProps) => {
  /**
   * Validation.
   */
  if (
    [currentPage, totalRecords, size, hasPrevious, hasNext].some(
      (el) => el === undefined || el === null,
    )
  ) {
    return null;
  }

  /**
   * Configurations.
   */
  const maxItems = 3; // number of pagination options
  const maxLeft = 1; // number of options on the left

  const numberOfPages = Math.ceil(totalRecords / size);
  const firstPageOfBlock = Math.max(currentPage - maxLeft, 1);

  const optionsAvailable = numberOfPages - currentPage; // control pagination visibility

  /**
   * Auxiliary functions.
   */
  const onPageChange = (page: number) => {
    if (page <= 1) {
      onChange(1);
      return;
    }

    if (page >= numberOfPages) {
      onChange(numberOfPages);
      return;
    }

    onChange(page);
  };

  return (
    <Flex gap={2}>
      <IconButton
        aria-label="Previous pagination page"
        icon={<IconChevronLeft size={"20"} />}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevious}
        size={"xs"}
      />

      <ButtonGroup size={"xs"}>
        {Array.from({
          length: Math.min(maxItems, optionsAvailable + (maxItems - 1)),
        })
          .map((_, index) => index + firstPageOfBlock)
          .map((page, index) => (
            <Button
              key={index}
              onClick={() => onPageChange(page)}
              isActive={currentPage === page}
            >
              {page}
            </Button>
          ))}
      </ButtonGroup>

      <IconButton
        aria-label="Next pagination page"
        icon={<IconChevronRight size={"20"} />}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        size={"xs"}
      />
    </Flex>
  );
};

/**
 * Package modal selector component.
 * @param title {string} Title of the modal selector.
 * @param isOpen {boolean} Flag indicating if the modal selector is open.
 * @param formPackages {KnowledgePackageRepresentation[]} Packages already available on the form.
 * @param onClose {function} Function called when the modal is closed.
 * @param handleAddition {function} Function to handle package selections.
 */
export const PackageSelector = ({
  title,
  isOpen,
  onClose,
  formPackages,
  handleAddition,
}: PackageSelectorProps) => {
  /**
   * Constants.
   */
  const initialSize = PAGINATION_SIZES[0];

  /**
   * States.
   */
  const [textSearch, setTextSearch] = useState<string>("");
  const [selectedPackages, setSelectedPackages] = useState<KnowledgePackage[]>(
    [],
  );
  const [query, setQuery] = useState<HubQueryObject>({
    page: 1,
    size: initialSize,
    q: "",
  });

  /**
   * Toast.
   */
  const toast = useToast();

  /**
   * Fetching operation.
   */
  const { data, isFetching } = useQuery<
    HubApiResponse<KnowledgePackageApiDocument>
  >(
    ["field-packages-selector", query],
    () => {
      return searchPackages(query);
    },
    {
      staleTime: 1000 * 60, // 60 seconds
      keepPreviousData: true,
    },
  );

  /**
   * Auxiliary functions.
   */
  const appendPackage = (pkg: KnowledgePackage) =>
    setSelectedPackages([...selectedPackages, pkg]);

  const removePackage = (pkg: KnowledgePackage) =>
    setSelectedPackages(selectedPackages.filter((p) => p.id !== pkg.id));

  const updateQueryText = (q: string) => setQuery({ ...query, q });
  const updateQueryPage = (page: number) => setQuery({ ...query, page });
  const updateQuerySize = (size: number) => setQuery({ ...query, size });

  /**
   * Prepare data to render.
   */
  const dataLinks = data?.links;
  const dataRecords = data?.hits.hits;
  const dataNumberOfRecords = data !== undefined ? data.hits.total : 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex height={"xl"} flexDirection={"column"} gap={2}>
            <Flex justifyContent={"space-between"} gap={1}>
              <Input
                size={"md"}
                placeholder={"Type to search"}
                onChange={(e) => {
                  setTextSearch(e.target.value);
                }}
              />
              <IconButton
                aria-label={"Search button"}
                icon={<IconSearch />}
                onClick={() => {
                  updateQueryText(textSearch);
                }}
              />
            </Flex>
            {isFetching ? (
              <Flex
                justifyContent={"center"}
                alignItems={"center"}
                height={"100%"}
              >
                <Spinner size={"md"} />
              </Flex>
            ) : (
              <VStack overflowY={"scroll"}>
                {dataRecords?.map((row) => (
                  <PackageItem
                    key={row.id}
                    data={row}
                    alreadyAdded={formPackages.some((fp) => fp.id === row.id)}
                    handleSelection={appendPackage}
                    handleDeletion={removePackage}
                  />
                ))}
              </VStack>
            )}
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"100%"}
          >
            <Flex>
              <SizeSelector onChange={updateQuerySize} />
            </Flex>

            <Flex>
              <PaginationSelector
                currentPage={query.page}
                totalRecords={dataNumberOfRecords}
                size={query.size}
                hasPrevious={dataLinks?.prev !== undefined}
                hasNext={dataLinks?.next !== undefined}
                onChange={updateQueryPage}
              />
            </Flex>

            <Button
              size={"sm"}
              leftIcon={<IconDeviceFloppy />}
              onClick={() => {
                if (selectedPackages.length > 0) {
                  toast({
                    title: "Success",
                    description: "Package added to the form",
                    status: "success",
                    duration: 4000, // 4 seconds
                    isClosable: true,
                    position: "top-right",
                  });

                  handleAddition(selectedPackages);
                  setSelectedPackages([]);
                  onClose();
                } else {
                  toast({
                    title: "Invalid selection",
                    description:
                      "You need to select at least one package to continue",
                    status: "error",
                    duration: 4000, // 4 seconds
                    isClosable: true,
                    position: "top-right",
                  });
                }
              }}
              disabled={selectedPackages.length === 0}
            >
              Add selected
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
