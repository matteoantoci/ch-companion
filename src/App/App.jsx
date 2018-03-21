/* eslint-disable no-undef */
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { observer } from 'mobx-react';
import './App.css';
import { fetchCoins } from '../tradingView/gateway';
import { createStore } from './store';
import { OptionsForm } from './OptionsForm';

function sendMessage(payload) {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, payload, resolve);
    });
  });
}

class App extends Component {
  constructor(props) {
    super(props);
    this.store = createStore();
    this.selectCoins = this.selectCoins.bind(this);
  }

  selectCoins() {
    this.store.setLoading(true);
    return fetchCoins()
      .then((coins) => {
        const filteredCoins = coins
          .filter((coin) => coin !== 'BNB')
          .slice(0, 50);
        return sendMessage({ coins: filteredCoins });
      })
      .finally(() => {
        this.store.setLoading(false);
      });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <OptionsForm
              store={this.store}
              handleButtonClick={this.selectCoins}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default observer(App);
