import { trim } from 'lodash-es';
import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { observer } from 'mobx-react';
import { Submit } from './Submit';

function formatListValue(value) {
  return value.split(',').map(trim);
}

export const OptionsForm = observer((props) => {
  const { store, handleFieldChange } = props;
  const createHandler = (fieldName) => (event) =>
    handleFieldChange(fieldName, event.target.value);
  const createListHandler = (fieldName) => (event) =>
    handleFieldChange(fieldName, formatListValue(event.target.value));
  return (
    <Form>
      <FormGroup>
        <Label for="exchange">Exchange:</Label>
        <Input
          type="select"
          name="exchange"
          id="exchange"
          value={store.fields.exchange}
          onChange={createHandler('exchange')}
        >
          {store.exchanges.map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="base-currency">Base currency:</Label>
        <Input
          type="text"
          name="base-currency"
          id="base-currency"
          onChange={createHandler('baseCurrency')}
          value={store.fields.baseCurrency}
        />
      </FormGroup>
      <FormGroup>
        <Label for="limit">Limit:</Label>
        <Input
          type="text"
          name="limit"
          id="limit"
          value={store.fields.limit}
          onChange={createHandler('limit')}
        />
      </FormGroup>
      <FormGroup>
        <Label for="blacklist">Blacklisted coins:</Label>
        <Input
          type="text"
          name="blacklist"
          id="blacklist"
          value={store.fields.blacklist.join(', ')}
          onChange={createListHandler('blacklist')}
        />
      </FormGroup>
      <FormGroup>
        <Label for="limit">Volatility (equal or above):</Label>
        <Input
          type="text"
          name="volatility"
          id="volatility"
          value={store.fields.volatility}
          onChange={createHandler('volatility')}
        />
      </FormGroup>
      <FormGroup>
        <Label for="exchange">Rating filter:</Label>
        <Input
          type="select"
          name="rating"
          id="rating"
          value={store.fields.rating}
          onChange={createHandler('rating')}
        >
          {store.ratingFilters.map(({ value, label }) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </Input>
      </FormGroup>
      <Submit {...props} />
    </Form>
  );
});
