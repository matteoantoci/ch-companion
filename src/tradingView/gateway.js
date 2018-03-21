import { difference, take } from 'lodash-es';
import { createQuery } from './query';

function formatResults({ data }) {
  return data.map(({ d: item }) => {
    const [name] = item;
    return name.replace('BTC', '');
  });
}

function applyConfig({ data, config }) {
  const { blacklist, limit } = config;
  const filteredCoins = difference(data, blacklist);
  return take(filteredCoins, limit);
}

export function fetchCoins(config) {
  return fetch('https://scanner.tradingview.com/crypto/scan', {
    body: createQuery(),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    method: 'POST',
  })
    .then((res) => res.json())
    .then(formatResults)
    .then((data) => applyConfig({ data, config }));
}
