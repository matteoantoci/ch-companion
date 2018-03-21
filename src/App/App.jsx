/* eslint-disable no-undef */
import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { observer } from 'mobx-react';
import Spinner from 'react-spinkit';
import './App.css';
import { fetchCoins } from '../tradingView/gateway';
import { createStore } from './store';

function sendMessage(payload) {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, payload, resolve);
    });
  });
}

const Submit = observer((props) => {
  const { store, handleButtonClick } = props;
  return store.isLoading ? (
    <Spinner
      name="line-scale"
      fadeIn="none"
      className="App-spinner text-primary"
    />
  ) : (
    <Button color="primary" onClick={handleButtonClick}>
      Select coins
    </Button>
  );
});

const OptionsForm = observer((props) => (
  <Form>
    <FormGroup>
      <Label for="base-currency">Base currency:</Label>
      <Input
        type="text"
        name="base-currency"
        id="base-currency"
        placeholder="BTC"
      />
    </FormGroup>
    <FormGroup>
      <Label for="exchange">Exchange</Label>
      <Input type="select" name="select" id="exchange">
        <option>Binance</option>
      </Input>
    </FormGroup>
    <Submit {...props} />
  </Form>
));

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
