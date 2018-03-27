import { observable, configure, action } from 'mobx';

configure({ enforceActions: true });

const EXCHANGES = ['', 'BINANCE', 'BITTREX', 'POLONIEX', 'KRAKEN', 'COINBASE'];
const RATING_FILTERS = [
  { value: '', label: 'None' },
  { value: 'Recommend.All', label: 'Rating' },
  { value: 'Recommend.Other', label: 'Oscillators rating' },
];
const FIELDS_DEFAULTS = {
  baseCurrency: '',
  exchange: '',
  blacklist: [],
  limit: '',
  volatility: '',
  rating: '',
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
    ratingFilters: RATING_FILTERS,
    fields: { ...FIELDS_DEFAULTS },
    get settings() {
      return store.fields;
    },
    setLoading,
    setField,
  });

  return store;
}
