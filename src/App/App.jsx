/* eslint-disable no-undef */
import { forEach } from 'lodash-es';
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { observer } from 'mobx-react';
import './App.css';
import logo from '../logo.png';
import { fetchCoins } from '../tradingView/gateway';
import { createStore } from './store';
import { OptionsForm } from './OptionsForm';
import { loadSettings } from '../settings';

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

class App extends Component {
  constructor(props) {
    super(props);
    this.store = createStore();
    this.selectCoins = this.selectCoins.bind(this);
    this.setField = this.setField.bind(this);
    this.loadSettings = this.loadSettings.bind(this);
    this.loadSettings();
  }

  setField(fieldName, value) {
    const { store } = this;
    store.setField(fieldName, value);
  }

  loadSettings() {
    const { store } = this;
    store.setLoading(true);
    return loadSettings()
      .then((settings) => {
        forEach(settings, (value, fieldName) => {
          store.setField(fieldName, value);
        });
      })
      .finally(() => {
        store.setLoading(false);
      });
  }

  selectCoins() {
    const { store } = this;
    store.setLoading(true);
    return fetchCoins(store.config)
      .then((coins) => sendMessage({ coins }))
      .finally(() => {
        store.setLoading(false);
      });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <img src={logo} alt="logo" className="App-logo" />
          </Col>
        </Row>
        <Row>
          <Col>
            <OptionsForm
              store={this.store}
              handleButtonClick={this.selectCoins}
              handleFieldChange={this.setField}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default observer(App);
