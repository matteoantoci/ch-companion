/* eslint-disable no-undef */

const SELECTABLE_COINS_SELECTOR = '.ms-selectable .ms-list li';
const SELECTED_COINS_SELECTOR = '.ms-selection .ms-list li';

const adapter = chrome || browser; // For cross-browser compatibility
const SETTINGS_KEY = 'settings.3';

function adapt(fn) {
  return function apply(...args) {
    return chrome
      ? new Promise((resolve) => {
          fn(...args, resolve);
        })
      : fn(...args);
  };
}

const commands = {
  selectCoins(request) {
    const $selectableCoins = $(SELECTABLE_COINS_SELECTOR);
    const $selectedCoins = $(SELECTED_COINS_SELECTOR);
    $selectedCoins.click();

    function selectSymbol(symbol) {
      const $symbol = $selectableCoins.filter(function getDomSelector() {
        const text = $(this).text();
        return text.endsWith(`(${symbol})`);
      });
      if (!$symbol.length) return;
      $symbol.click();
    }

    const { coins = [] } = request;
    coins.forEach(selectSymbol);
    return Promise.resolve();
  },
  loadSettings() {
    return adapt(adapter.storage.local.get)([SETTINGS_KEY]).then((result) => {
      const settings = result && result[SETTINGS_KEY];
      return settings || {};
    });
  },
  saveSettings(request) {
    const { settings } = request;
    return adapt(adapter.storage.local.set)({ [SETTINGS_KEY]: settings });
  },
};

function handleCommand(request, sender, sendResponse) {
  const { command } = request;
  const runCommand = commands[command];
  runCommand(request).then((data) => {
    sendResponse({ ok: true, data });
  });
  return true;
}

adapter.runtime.onMessage.addListener(handleCommand);
