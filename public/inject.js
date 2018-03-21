/* eslint-disable no-undef */

const SELECTABLE_COINS_SELECTOR = '.ms-selectable .ms-list li';
const SELECTED_COINS_SELECTOR = '.ms-selection .ms-list li';

const adapter = chrome || browser; // For cross-browser compatibility

adapter.runtime.onMessage.addListener((request, sender, sendResponse) => {
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

  const symbolsToSelect = request.coins || [];
  symbolsToSelect.forEach(selectSymbol);
  sendResponse({ ok: true });
});
