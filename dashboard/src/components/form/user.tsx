/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { Box } from "@chakra-ui/react";

import { useQuery } from "react-query";

import { MultiSelectionField } from "./base";
import { VocabulariesApi } from "../../resources/gkhub";
import { StrapiApi } from "../../resources/strapi";

//
// Auxiliary functions
//
const readHubData = async (
  apiPrefix: string,
  suggestData: string,
): Promise<object[]> => {
  const vocabulariesApi = new VocabulariesApi<HubApiResponse>(apiPrefix);

  return vocabulariesApi.suggest(suggestData).then((response) => {
    return response.data.hits.hits;
  });
};

const readManagerData = async (
  apiPrefix: string,
  suggestData: string,
): Promise<object[]> => {
  const countriesApi = new StrapiApi<ManagerApiResponse>(apiPrefix);

  return countriesApi.suggest(suggestData).then((response) => {
    return response.data.data;
  });
};

const generateVocabularyPopulationFunction = (
  apiPrefix: string,
  dataHandler: (row: any) => object,
  dataReader: (apiPrefix: string, suggestData: string) => Promise<object[]>,
) => {
  return (inputValue: string, callback: any) => {
    dataReader(apiPrefix, inputValue).then((data) => {
      const suggestedData: object[] = data.map(dataHandler);
      callback(suggestedData);
    });
  };
};

//
// Components
//

export const OrganizationsField = ({ from, field, label, control, rules }) => {
  const apiPrefix = "affiliations"; // GKH API Endpoint

  const { isLoading, data: initialOptions } = useQuery(apiPrefix, () => {
    return readHubData(apiPrefix, "").then((data) =>
      data.map((row) => ({
        value: row,
        label: row.name,
      })),
    );
  });

  return (
    <MultiSelectionField
      from={from}
      field={field}
      label={label}
      control={control}
      rules={rules}
      isLoading={isLoading}
      defaultOptions={initialOptions}
      loadOptions={generateVocabularyPopulationFunction(
        apiPrefix,
        (row: any) => {
          return {
            label: row.name,
            value: row,
          };
        },
        readHubData,
      )}
      serializer={(values) => {
        return values !== null
          ? values.map((row) => ({
              id: row.value.id,
              name: row.value.name,
              tag: row.value.acronym,
            }))
          : null;
      }}
      deserializer={(values) => {
        if (values === undefined) return values;

        return values.map((row) => ({
          value: row,
          label: row.name,
        }));
      }}
    />
  );
};

export const ProgrammeField = ({ from, field, label, control, rules }) => {
  const apiPrefix = "vocabularies/geowptypes";

  const { isLoading, data: initialOptions } = useQuery(apiPrefix, () => {
    return readHubData(apiPrefix, "").then((data) =>
      data.map((row) => ({
        value: row,
        label: row.title.en,
      })),
    );
  });

  return (
    <Box mb={"3"}>
      <MultiSelectionField
        from={from}
        field={field}
        label={label}
        control={control}
        rules={rules}
        isLoading={isLoading}
        defaultOptions={initialOptions}
        loadOptions={generateVocabularyPopulationFunction(
          apiPrefix,
          (row: any) => {
            return {
              label: row.title.en,
              value: row,
            };
          },
          readHubData,
        )}
        serializer={(values) => {
          return values !== null
            ? values.map((row) => {
                let rowData = row.value;

                if (row.value.props !== undefined) {
                  rowData = {
                    name: row.value.title.en,
                    tag: row.value.props.acronym,
                    id: row.value.id,
                  };
                }
                return rowData;
              })
            : null;
        }}
        deserializer={(values) => {
          if (values === undefined) return values;

          return values.map((row) => ({
            value: row,
            label: row.name,
          }));
        }}
      />
    </Box>
  );
};

export const CountriesField = ({ from, field, label, control, rules }) => {
  const apiPrefix = "api/countries";

  const { isLoading, data: initialOptions } = useQuery(apiPrefix, () => {
    return readManagerData(apiPrefix, "").then((data) =>
      data.map((row) => ({
        label: row.attributes.name,
        value: { id: row.id, ...row.attributes },
      })),
    );
  });

  return (
    <Box mb={"3"}>
      <MultiSelectionField
        from={from}
        field={field}
        label={label}
        control={control}
        rules={rules}
        isLoading={isLoading}
        defaultOptions={initialOptions}
        loadOptions={generateVocabularyPopulationFunction(
          "api/countries",
          (row: any) => {
            return {
              label: row.attributes.name,
              value: { id: row.id, ...row.attributes },
            };
          },
          readManagerData,
        )}
        serializer={(values) => {
          return values !== null
            ? values.map((row) => ({
                id: row.value.id,
                name: row.value.name,
                tag: row.value.tag,
              }))
            : null;
        }}
        deserializer={(values) => {
          if (values === undefined) return values;

          return values.map((row) => ({
            value: row,
            label: row.name,
          }));
        }}
      />
    </Box>
  );
};
