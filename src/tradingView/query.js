export const createQuery = (config) => {
  const { exchange, baseCurrency, sortBy } = config;
  return JSON.stringify({
    filter: [
      {
        left: 'exchange',
        operation: 'equal',
        right: exchange.toUpperCase(),
      },
      {
        left: 'name',
        operation: 'match',
        right: baseCurrency.toLowerCase(),
      },
    ],
    columns: ['name'],
    sort: {
      sortBy,
      sortOrder: 'desc',
    },
    options: {
      lang: 'en',
    },
    range: [0, 150],
  });
};
