export const createQuery = () => {
  return JSON.stringify({
    filter: [
      {
        left: 'total_value_traded',
        operation: 'nempty',
      },
      {
        left: 'exchange',
        operation: 'equal',
        right: 'BINANCE',
      },
      {
        left: 'name',
        operation: 'match',
        right: 'btc',
      },
    ],
    symbols: {
      query: {
        types: [],
      },
    },
    columns: [
      'name',
      'total_value_traded',
      'name',
      'subtype',
    ],
    sort: {
      sortBy: 'total_value_traded',
      sortOrder: 'desc',
    },
    options: {
      lang: 'en',
    },
    range: [
      0,
      150,
    ],
  });
};
