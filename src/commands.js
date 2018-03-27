/* eslint-disable no-undef */

const TABS_QUERY = { active: true, currentWindow: true };

function sendMessage(payload) {
  return chrome // For cross-browser compatibility
    ? new Promise((resolve) => {
        chrome.tabs.query(TABS_QUERY, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, payload, resolve);
        });
      })
    : browser.tabs.query(TABS_QUERY).then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, payload);
      });
}

export function selectCoins({ coins }) {
  const command = 'selectCoins';
  const payload = { command, coins };
  return sendMessage(payload);
}

export function loadSettings() {
  const command = 'loadSettings';
  const payload = { command };
  return sendMessage(payload);
}

export function saveSettings({ settings }) {
  const command = 'saveSettings';
  const payload = { command, settings };
  return sendMessage(payload);
}
