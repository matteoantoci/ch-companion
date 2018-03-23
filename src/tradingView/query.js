const checkValue = (value) => !!(value && value.length);

function createOscillatorsRatingFilter(rating) {
  return checkValue(rating)
    ? {
        filterOR: [
          {
            left: rating,
            operation: 'in_range',
            right: [0.5, 1], // Strong buy
          },
          {
            left: rating,
            operation: 'in_range',
            right: [0, 0.5], // Buy
          },
          {
            left: rating,
            operation: 'equal',
            right: 0, // Neutral
          },
        ],
      }
    : {};
}

function createVolatilityFilter(volatility) {
  return checkValue(volatility)
    ? {
        left: 'Volatility.D',
        operation: 'egreater',
        right: parseInt(volatility, 10),
      }
    : null;
}

function createBaseFilters(config) {
  const { exchange, baseCurrency, volatility } = config;
  const filters = [
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
  ];
  const optionalFilters = [createVolatilityFilter(volatility)].filter(Boolean);
  return filters.concat(optionalFilters);
}

export const createQuery = (config) => {
  const { rating } = config;
  return JSON.stringify({
    filter: createBaseFilters(config),
    ...createOscillatorsRatingFilter(rating),
    columns: ['name'],
    sort: {
      sortBy: 'volume', // 24h volume
      sortOrder: 'desc',
    },
    options: {
      lang: 'en',
    },
    range: [0, 75],
  });
};
