/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Layer, Text } from 'grommet';
import Checkout from '../checkout/Checkout';

const DetailsCard = ({ spot }) => {
  const [isCheckoutModalOpen, openCheckoutModal] = useState(false);

  return (
    <>
      <Box background="white" pad="medium" fill>
        <Text weight="bold" textAlign="center" size="large">Spot Details</Text>
        <Text margin={{bottom: 'small'}} weight="bold" textAlign="left" size="large">{spot.title}</Text>
        <Text margin={{bottom: 'small'}}>{spot.description}</Text>
        {/* TO-DO: implement TextButton component to take advantage of loading indicator */}
        <Button
          alignSelf="center"
          primary
          color="blue"
          onClick={() => openCheckoutModal(true)}
          label={<Text color="white">{`$${spot.price / 100} | Book it!`}</Text>}
        />
      </Box>
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
    </>
  );
};

DetailsCard.propTypes = {
  spot: PropTypes.object.isRequired,
};

export default DetailsCard;

