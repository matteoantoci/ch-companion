import { difference, take } from 'lodash-es';
import { createQuery } from './query';

function formatResults({ data, config }) {
  const { baseCurrency } = config;
  return data.map(({ d: item }) => {
    const [name] = item;
    return name.replace(baseCurrency.toUpperCase(), '');
  });
}

function applyConfig({ data, config }) {
  const { blacklist, limit } = config;
  const filteredCoins = difference(data, blacklist);
  return take(filteredCoins, limit);
}

export function fetchCoins(config) {
  return fetch('https://scanner.tradingview.com/crypto/scan', {
    body: createQuery(config),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    method: 'POST',
  })
    .then((res) => res.json())
    .then(({ data }) => formatResults({ data, config }))
    .then((data) => applyConfig({ data, config }));
}
