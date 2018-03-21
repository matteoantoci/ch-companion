import { pick } from 'lodash-es';
import { observable, configure, action } from 'mobx';

configure({ enforceActions: true });

export function createStore() {
  let store;

  const setLoading = action((isLoading) => {
    store.isLoading = isLoading;
  });

  store = observable({
    isLoading: false,
    fields: {
      baseCurrency: 'BTC',
      exchange: 'BINANCE',
      blacklist: ['BNB', 'USDT'],
      limit: 50,
    },
    setLoading,
  });

  return store;
}
