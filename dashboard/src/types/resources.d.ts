/*
 * This file is part of User Dashboard.
 * Copyright (C) 2023 GEO Secretariat.
 *
 * User Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

type DataHits = {
  hits: object[];
};

type ApiDataResponse = {
  hits: DataHits;
  sortBy: string;
  links: object;
};

type ApiClientResponse = {
  data: ApiDataResponse;
  code: number;
  errors: object[];
};
