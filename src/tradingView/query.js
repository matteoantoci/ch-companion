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
       : {};
}

function createVolatilityFilter(volatility) {
  return checkValue(maxChange)
    ? { left: 'change', operation: 'eless', right: parseFloat(maxChange) }
    : null;
}

function createBaseFilters(settings) {
  const { exchange, baseCurrency, volatility, maxChange } = settings;
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
  const optionalFilters = [
    createVolatilityFilter(volatility),
    createMaxChangeFilter(maxChange),
  ].filter(Boolean);
  return filters.concat(optionalFilters);
}

export const createQuery = (settings) => {
  const { rating } = settings;
  return JSON.stringify({
    filter: createBaseFilters(settings),
    ...createOscillatorsRatingFilter(rating),
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
