import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import TextButton from 'common/TextButton';
import SpotItem from 'spot/SpotItem';

const Checkout = ({
    spot,
    onHeaderTextClick,
    headerText
}) => {
    return (
        <>
            <Box
                background="#0082ff"
                align="start"
            >
                <TextButton
                    onClick={onHeaderTextClick}
                >
                    {headerText}
                </TextButton>
            </Box>
            <Box
                pad="medium"
                gap="small"
                width="medium"
                background="white"
            >
                <SpotItem
                    key={`checkout-spot-${spot.id}`}
                    data={spot}
                    showDetails={false}
                />
            </Box>
        </>
    );
};

Checkout.propTypes = {
    spot: PropTypes.object.isRequired,
    onHeaderTextClick: PropTypes.func.isRequired,
    headerText: PropTypes.string,
};

export default Checkout;
