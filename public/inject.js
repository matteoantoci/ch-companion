/* eslint-disable no-undef */

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const $selectableCoins = $('.ms-selectable .ms-list li');
  const $selectedCoins = $('.ms-selection .ms-list li');
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
