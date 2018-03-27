import { difference, take } from 'lodash-es';
import { createQuery } from './query';

function formatResults({ data, settings }) {
  const { baseCurrency } = settings;
  return data.map(({ d: item }) => {
    const [name] = item;
    return name.replace(baseCurrency.toUpperCase(), '');
  });
}

function applysettings({ data, settings }) {
  const { blacklist, limit } = settings;
  const filteredCoins = difference(data, blacklist);
  return take(filteredCoins, limit);
}

export function fetchCoins(settings) {
  return fetch('https://scanner.tradingview.com/crypto/scan', {
    body: createQuery(settings),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    method: 'POST',
  })
    .then((res) => res.json())
    .then(({ data }) => formatResults({ data, settings }))
    .then((data) => applysettings({ data, settings }));
}
