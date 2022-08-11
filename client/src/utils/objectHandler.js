export const copyFiltersObject = (filters) => {
  return {
    cast: { ...filters.cast },
    country: { ...filters.country },
    genre: { ...filters.genre },
  };
};
