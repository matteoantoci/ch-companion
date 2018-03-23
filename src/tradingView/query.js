function createOscillatorsRatingFilter(isOscillatorsRatingEnabled) {
  return isOscillatorsRatingEnabled
    ? {
        filterOR: [
          {
            left: 'Recommend.Other',
            operation: 'in_range',
            right: [0.5, 1], // Strong buy
          },
          {
            left: 'Recommend.Other',
            operation: 'in_range',
            right: [0, 0.5], // Buy
          },
          {
            left: 'Recommend.Other',
            operation: 'equal',
            right: 0, // Neutral
          },
        ],
      }
    : {};
}

export const createQuery = (config) => {
  const { exchange, baseCurrency, isOscillatorsRatingEnabled } = config;
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
    ...createOscillatorsRatingFilter(isOscillatorsRatingEnabled),
    columns: ['name'],
    sort: {
      sortBy: 'volume', // 24h volume
      sortOrder: 'desc',
    },
    options: {
      lang: 'en',
    },
    range: [0, 150],
  });
};
