/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

/**
 * Prepare a function to be used in the ``loadOptions`` from ``react-select`` component.
 * @param dataHandler  {function} Function to transform the data loaded from the API.
 * @param dataReader {function} Function used to read data from the API.
 */
export function generatePopulationFunction<T>(
  dataHandler: (row: T) => object,
  dataReader: (suggestData: string) => Promise<T[]>,
) {
  return (inputValue: string, callback: (options: object[]) => void) => {
    dataReader(inputValue).then((data: T[]) => {
      const suggestedData = data.map(dataHandler);
      callback(suggestedData);
    });
  };
}
