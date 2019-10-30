import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {updateSelected} from 'spot/spot-actions';
import SpotList from './spot-list/SpotList';
import { purchase } from '../spot/spot-actions';

const Search = ({
    selectedSpot,
    purchasedSpot,
    purchaseSpot,
    spots,
    setSpot
}) => {
    return (
        <div className="Search">
            <SpotList
                spots={spots}
                selectedSpot={selectedSpot}
                setSpot={setSpot}
                purchaseSpot={purchaseSpot}
                purchasedSpot={purchasedSpot}
            />
            <div className="Search-content" />
        </div>
    );
};

Search.propTypes = {
    selectedSpot: PropTypes.object,
    spots: PropTypes.arrayOf(PropTypes.object).isRequired,
    setSpot: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const {
        spot: {
            selected: selectedSpot,
            purchased: purchasedSpot,
        }
    } = state;

    return {
        selectedSpot,
        purchasedSpot
    };
};

const mapDispatchToProps = {
    setSpot: updateSelected,
    purchaseSpot: purchase,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
