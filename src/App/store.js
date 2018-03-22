import { observable, configure, action } from 'mobx';

configure({ enforceActions: true });

const EXCHANGES = ['BINANCE', 'BITTREX', 'POLONIEX', 'KRAKEN', 'COINBASE'];
const SORT_OPTIONS = [
  { key: 'average_volume_10d_calc', label: 'AVG volume 10 days' },
  { key: 'volume|60', label: 'Volume' },
  { key: 'total_value_traded', label: 'Total traded volume' },
];
const FIELDS_DEFAULTS = {
  baseCurrency: 'BTC',
  exchange: 'BINANCE',
  blacklist: ['USDT'],
  limit: 50,
  sortBy: 'average_volume_10d_calc',
};

export function createStore() {
  let store;

  const setLoading = action((isLoading) => {
    store.isLoading = isLoading;
  });

  const setField = action((fieldName, value) => {
    store.fields[fieldName] = value;
  });

  store = observable({
    isLoading: false,
    exchanges: EXCHANGES,
    sortOptions: SORT_OPTIONS,
    fields: { ...FIELDS_DEFAULTS },
    get config() {
      return store.fields;
    },
    setLoading,
    setField,
  });

  return store;
}
