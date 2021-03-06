import React from 'react';
import PropTypes from 'prop-types';

import * as Styled from './styles';

function SubmitButton({ text }) {
  return (
    <Styled.Container data-testid="submit-button" type="submit">
      {text}
    </Styled.Container>
  );
}

export default SubmitButton;

SubmitButton.propTypes = {
  text: PropTypes.string.isRequired,
};
