/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { Box } from "@chakra-ui/react";

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
  const vocabulariesApi = new VocabulariesApi(apiPrefix);

  return vocabulariesApi.suggest(suggestData).then((response) => {
    return response.data.hits.hits;
  });
};

const readStrapiData = async (
  apiPrefix: string,
  suggestData: string,
): Promise<object[]> => {
  const countriesApi = new StrapiApi(apiPrefix);

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

export const OrganizationsField = ({ label, path, control, rules }) => {
  return (
    <MultiSelectionField
      name={path}
      label={label}
      control={control}
      rules={rules}
      loadOptions={generateVocabularyPopulationFunction(
        "affiliations",
        (row: any) => {
          return {
            label: `${row.name} (${row.acronym})`,
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

export const ProgrammeField = ({ label, path, control, rules }) => {
  return (
    <Box mb={"3"}>
      <MultiSelectionField
        name={path}
        label={label}
        control={control}
        rules={rules}
        loadOptions={generateVocabularyPopulationFunction(
          "vocabularies/geowptypes",
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
            ? values.map((row) => ({
                id: row.value.id,
                name: row.value.title.en,
                tag: row.value.props.acronym,
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

export const CountriesField = ({ label, path, control, rules }) => {
  return (
    <Box mb={"3"}>
      <MultiSelectionField
        name={path}
        label={label}
        control={control}
        rules={rules}
        loadOptions={generateVocabularyPopulationFunction(
          "api/countries",
          (row: any) => {
            return {
              label: row.attributes.name,
              value: { id: row.id, ...row.attributes },
            };
          },
          readStrapiData,
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
