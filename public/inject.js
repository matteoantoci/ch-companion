chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const symbolsToSelect = request.coins || [];
  const $selectableCoins = $('.ms-selectable .ms-list li');
  const $selectedCoins = $('.ms-selection .ms-list li');
  $selectedCoins.click();
  const getCoinSelector = (symbol) =>
  $selectableCoins.filter(function() {
    const text = $(this).text();
    return text.endsWith(`(${symbol})`);
  });
  symbolsToSelect.forEach((symbol) => {
    getCoinSelector(symbol).click();
  });
  // And respond back to the sender.
  // sendResponse('got your message, thanks!');
});
