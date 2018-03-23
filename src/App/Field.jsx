import React from 'react';
import { observer } from 'mobx-react';
import { Col, FormGroup, Input, Label } from 'reactstrap';

export const Field = observer((props) => {
  const {
    store,
    handleChange,
    children,
    fieldName,
    label,
    type = 'text',
  } = props;
  const value = props.value || store.fields[fieldName];
  return (
    <FormGroup row>
      <Label for={fieldName} sm={4}>
        {label}
      </Label>
      <Col sm={8}>
        <Input
          type={type}
          name={fieldName}
          id={fieldName}
          value={value}
          onChange={handleChange}
        >
          {children}
        </Input>
      </Col>
    </FormGroup>
  );
});
