import { observable, configure, action } from 'mobx';

configure({ enforceActions: true });

const EXCHANGES = ['BINANCE', 'BITTREX', 'POLONIEX', 'KRAKEN', 'COINBASE'];
const FIELDS_DEFAULTS = {
  baseCurrency: 'BTC',
  exchange: 'BINANCE',
  blacklist: ['BNB', 'USDT'],
  limit: 50,
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
    fields: { ...FIELDS_DEFAULTS },
    get config() {
      return store.fields;
    },
    setLoading,
    setField,
  });

  return store;
}
