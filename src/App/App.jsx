import { forEach } from 'lodash-es';
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { observer } from 'mobx-react';
import './App.css';
import logo from '../logo.png';
import { fetchCoins } from '../tradingView/gateway';
import { createStore } from './store';
import { OptionsForm } from './OptionsForm';
import { selectCoins, saveSettings, loadSettings } from '../commands';

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
      .then(({ data }) => {
        forEach(data, (value, fieldName) => {
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
      .then((coins) => selectCoins({ coins }))
      .then(() => saveSettings({ settings: store.config }))
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
