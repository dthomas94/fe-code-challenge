/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Layer, Text } from 'grommet';
import Checkout from '../checkout/Checkout';

const DetailsCard = ({ spot }) => {
  const [isCheckoutModalOpen, openCheckoutModal] = useState(false);

  return (
    <Box>
      <Text>{spot.title}</Text>
      <Text>{spot.description}</Text>
      <Button
        onClick={() => openCheckoutModal(true)}
        label={`$${spot.price / 100} | Book it!`}
      />

      {
        isCheckoutModalOpen &&
        <Layer>

          <Checkout
            spot={spot}
            onHeaderTextClick={this._onCloseModal}
            headerText="&lt; Back to Search"
          />
        </Layer>
      }
    </Box>
  );
};

DetailsCard.propTypes = {
  spot: PropTypes.object.isRequired,
};

export default DetailsCard;

