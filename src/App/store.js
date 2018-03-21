import { observable, configure, action } from 'mobx';

configure({ enforceActions: true });

export function createStore() {
  let store;

  const setLoading = action((isLoading) => {
    store.isLoading = isLoading;
  });

  store = observable({
    isLoading: false,
    setLoading,
  });

  return store;
}
