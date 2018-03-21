import { createQuery } from './query';

export function fetchCoins() {
  return fetch('https://scanner.tradingview.com/crypto/scan', {
    body: createQuery(),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    method: 'POST',
  })
    .then((res) => res.json())
    .then(({ data }) =>
      data.map(({ d: item }) => {
        const [name] = item;
        return name.replace('BTC', '');
      })
    );
}
