import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { observer } from 'mobx-react';
import { Submit } from './Submit';

export const OptionsForm = observer((props) => (
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
