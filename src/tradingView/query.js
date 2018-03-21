export const createQuery = (config) => {
  const { exchange, baseCurrency } = config;
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
    columns: ['name', 'total_value_traded'],
    sort: {
      sortBy: 'total_value_traded',
      sortOrder: 'desc',
    },
    options: {
      lang: 'en',
    },
    range: [0, 150],
  });
};
