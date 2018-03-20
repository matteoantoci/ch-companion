/* eslint-disable no-undef */
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function sendMessage(payload) {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, payload, resolve);
    });
  });
}

function fetchCoins() {
  return fetch('https://scanner.tradingview.com/crypto/scan', {
    body:
    '{"filter":[{"left":"volume|60","operation":"nempty"},{"left":"exchange","operation":"equal","right":"BINANCE"},{"left":"name","operation":"match","right":"btc"}],"symbols":{"query":{"types":[]}},"columns":["name","change_abs|60","volume|60","name","subtype","pricescale","minmov","fractional","minmove2"],"sort":{"sortBy":"volume|60","sortOrder":"desc"},"options":{"lang":"en"},"range":[0,150]}',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    method: 'POST',
  })
  .then((res) => res.json())
  .then(({ data }) => {
    const top50 = data.slice(0, 50);
    return top50.map(({ d: item }) => {
      const [name] = item;
      const symbol = name.replace('BTC', '');
      return symbol;
    });
  });
}

function doThings() {
  fetchCoins().then((coins) => {
    sendMessage({ coins });
  });
}

class App extends Component {
  render() {
    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <button onClick={doThings}>Push me!</button>
    </div>
    );
  }
}

export default App;
