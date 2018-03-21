import React from 'react';
import { Button } from 'reactstrap';
import { observer } from 'mobx-react';
import Spinner from 'react-spinkit';

export const Submit = observer((props) => {
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
