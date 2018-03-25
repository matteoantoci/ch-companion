export function loadSettings() {
  return fetch('./settings.json').then((res) => res.json());
}
