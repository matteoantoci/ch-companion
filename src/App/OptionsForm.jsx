import { trim } from 'lodash-es';
import React from 'react';
import { Form, FormGroup, Col } from 'reactstrap';
import { observer } from 'mobx-react';
import { Submit } from './Submit';
import { Field } from './Field';

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
      <Field
        fieldName="exchange"
        label="Exchange"
        type="select"
        store={store}
        handleChange={createHandler('exchange')}
      >
        {store.exchanges.map((value) => (
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </Field>
      <Field
        fieldName="baseCurrency"
        label="Base currency"
        store={store}
        handleChange={createHandler('baseCurrency')}
      />
      <Field
        fieldName="limit"
        label="Limit"
        store={store}
        handleChange={createHandler('limit')}
      />
      <Field
        fieldName="whitelist"
        label="Whitelisted coins"
        store={store}
        value={store.fields.whitelist.join(', ')}
        handleChange={createListHandler('whitelist')}
      />
      <Field
        fieldName="blacklist"
        label="Blacklisted coins"
        store={store}
        value={store.fields.blacklist.join(', ')}
        handleChange={createListHandler('blacklist')}
      />
      <Field
        fieldName="volatility"
        label="Min % volatility"
        store={store}
        handleChange={createHandler('volatility')}
      />
      <Field
        fieldName="maxChange"
        label="Max % change"
        store={store}
        handleChange={createHandler('maxChange')}
      />
      <Field
        fieldName="rating"
        label="Rating filter"
        type="select"
        store={store}
        handleChange={createHandler('rating')}
      >
        {store.ratingFilters.map(({ value, label }) => (
          <option value={value} key={value}>
            {label}
          </option>
        ))}
      </Field>
      <FormGroup row>
        <Col>
          <Submit {...props} />
        </Col>
      </FormGroup>
    </Form>
  );
});
