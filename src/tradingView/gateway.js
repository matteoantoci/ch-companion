import { difference, take, uniq } from 'lodash-es';
import { createQuery } from './query';

function formatResults({ data, settings }) {
  const { baseCurrency } = settings;
  return data.map(({ d: item }) => {
    const [name] = item;
    return name.replace(baseCurrency.toUpperCase(), '');
  });
}

function applysettings({ data, settings }) {
  const { whitelist, blacklist, limit } = settings;
  const filteredCoins = difference(data, blacklist);
  const allCoins = uniq(whitelist.concat(filteredCoins));
  return take(allCoins, limit);
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
