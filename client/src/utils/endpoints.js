export const GET_COUNTRIES_ENDPOINT = "/api/catalog/countries";
export const GET_CAST_ENDPOINT = "/api/catalog/cast";
export const GET_GENRES_ENDPOINT = "/api/catalog/genres";
export const GET_MOVIES_ENDPOINT = "/api/movies/facet-search";

export const RUNTIMES_INTERVALS = [
  { lowLimit: 0, upLimit: 1001 },
  { lowLimit: 0, upLimit: 59 },
  { lowLimit: 60, upLimit: 89 },
  { lowLimit: 90, upLimit: 119 },
  { lowLimit: 120, upLimit: 179 },
  { lowLimit: 180, upLimit: 1000 },
];
