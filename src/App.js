/* eslint-disable no-undef */
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './App.css';
import { createQuery } from "./query";

function sendMessage(payload) {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, payload, resolve);
    });
  });
}

function fetchCoins() {
  return fetch('https://scanner.tradingview.com/crypto/scan', {
    body: createQuery(),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    method: 'POST',
  })
  .then((res) => res.json())
  .then(({ data }) => {
    return data.map(({ d: item }) => {
      const [name] = item;
      return name.replace('BTC', '');
    });
  });
}

function selectCoins() {
  fetchCoins().then((coins) => {
    const filteredCoins = coins.filter((coin) => coin !== 'BNB').slice(0, 50);
    sendMessage({ coins: filteredCoins });
  });
}

class App extends Component {
  render() {
    return (
    <Container>
      <Row>
        <Col>
          <Form>
            <FormGroup>
              <Label for="base-currency">Base currency:</Label>
              <Input type="text" name="base-currency" id="base-currency" placeholder="BTC" />
            </FormGroup>
            <FormGroup>
              <Label for="exchange">Exchange</Label>
              <Input type="select" name="select" id="exchange">
                <option>Binance</option>
              </Input>
            </FormGroup>
            <Button onClick={selectCoins}>Select coins</Button>
          </Form>
        </Col>
      </Row>
    </Container>
    );
  }
}

export default App;
