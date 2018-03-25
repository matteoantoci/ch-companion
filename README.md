# CH Companion

## What's this?
CH Companion is a browser extension that lets you auto-select most traded coins using [TradingView](https://www.tradingview.com)'s volume data in CH config page.

![image](screenshot.png?raw=true)

### How does it work?
When you press the "Select coin" button, CH Companion queries TradingView for latest data with this strategy:
  * It orders by `volume DESC`, using 24h candles
  * It filters by the `exchange` and `base currency` you have input
  * It throws away from the results the currencies you have put in the `blacklist` field
  * It **optionally** filters out the results that don't match the `volatility` threshold
  * It **optionally** filters out the results that don't match the `Oscillators rating` requirements (*Strong buy*, *buy* and *neutral*)
  * It limits the results to the number of coins you have input in `limit` field
  
And finally it will auto-select the resulting coins on your CH config page.

### Disclaimer
1. I'm not responsible for any losses you might occur using this software. Use it at your own risk.
1. Since data comes from a third party website (TradingView) the results may not be consistent with the data shown on your exchange website (eg: Volume on Binance).
1. Always check the selected currencies before applying changes

### Installation for Firefox
1. Download the extension from [--> here <--](https://github.com/matteoantoci/ch-companion/raw/master/dist/ch-companion.zip)
1. Extract the zip file
1. Go to the debugging page in Firefox (`about:debugging`)
1. Click on the "Load Temporary Add-on" button
1. Select the `manifest.json` file in your unzipped extension folder

### Installation for Chrome
1. Download the ZIP extension from [--> here <--](https://github.com/matteoantoci/ch-companion/raw/master/dist/ch-companion.zip)
1. Extract the zip file
1. Go to Chrome Extensions page (`chrome://extensions/`)
1. Enable "Developer mode"
1. Click on "Load unpacked" and select the folder where you unzipped the file

### Usage
1. Go to your CH config page
1. Click on the extension icon
1. Set preferences. **Watch out**: Blacklist accepts comma separated values! Eg: `USDT, BNB`.
1. Click on the "Select coins" button

That's it!

### Default settings
Default settings are read from `settings.json`, you can easily edit it in your unpacked extension's folder. 

Changes are automatically applied next time you click on the extension icon.

Additional info: 
* For blacklist use a JSON array. Eg: `"blacklist": ["USDT", "BNB"]`
* For overall rating use the string `"Recommend.All"`
* For oscillators rating use the string `"Recommend.Other"`

### To do
1. Proper logo
1. Add save/load config feature
1. Publish this on Chrome Web Store
1. Publish this on Firefox Add-ons
1. Buy a Lambo

### Donations
This software is free and open source. You may want to consider buying me a "crypto-beer" =)

**BTC**: 1ER32tJqr4ApakJtzAPQfGyQnn4DJD8P6i

**ETH**: 0xae4a91c06542514cccd573cab52b8b1c66f0c342

**LTC**: LYcxLoTdtYX73zxdHWxjnMzTHoMQ5mEkWZ
