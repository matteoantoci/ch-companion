/* eslint-disable no-undef */

const SELECTABLE_COINS_SELECTOR = '.ms-selectable .ms-list li';
const SELECTED_COINS_SELECTOR = '.ms-selection .ms-list li';

const adapter = chrome || browser; // For cross-browser compatibility

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
