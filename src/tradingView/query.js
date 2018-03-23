function createOscillatorsRatingFilter(rating) {
  return rating && rating.length
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
  return {
    left: 'Volatility.D',
    operation: 'egreater',
    right: parseInt(volatility, 10),
  };
}

export const createQuery = (config) => {
  const { exchange, baseCurrency, rating, volatility } = config;
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
      ...createVolatilityFilter(volatility),
    ],
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
