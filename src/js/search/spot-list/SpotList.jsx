/* eslint-disable react/jsx-no-bind */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TextButton from 'common/TextButton';
import SpotItem from 'spot/SpotItem';
import { Box, Layer, Text } from 'grommet';
import Checkout from '../../checkout/Checkout';

export default class SpotList extends PureComponent {
    static propTypes = {
        selectedSpot: PropTypes.object,
        spots: PropTypes.arrayOf(PropTypes.object).isRequired,
        setSpot: PropTypes.func.isRequired
    };

    state = {
        isDetailsModalOpen: false
    };

    _onDetailsClick = spot => {
        this._onOpenModal();
        this.props.setSpot(spot);
    };

    _onCloseModal = () => {
        this.setState({
            isDetailsModalOpen: false
        });
    };

    _onOpenModal = () => {
        this.setState({
            isDetailsModalOpen: true
        });
    };

    render() {
        const { selectedSpot, spots } = this.props;
        const { isDetailsModalOpen } = this.state;

        return (
            <Box className="SpotList">
                <div
                    className="SpotList-feature"
                >
                    <div className="SpotList-breadcrumbs">
                        <Text><TextButton>Chicago</TextButton> &gt; Millennium Park</Text>
                    </div>
                    <Text as="h1">Millennium Park</Text>
                    <Text as="p">{spots.length} Spots Available</Text>
                </div>
                <Box className="SpotList-spots">
                    {spots.map(spot => {
                        return (
                            <>
                                <SpotItem
                                    key={spot.id}
                                    data={spot}
                                    isSelected={
                                        selectedSpot && selectedSpot.id === spot.id
                                    }
                                    onDetailsClick={this._onDetailsClick}
                                />
                                { isDetailsModalOpen &&
                                    <Layer
                                        key={`layer-${spot.id}`}
                                        position="center"
                                        plain
                                        modal
                                    >
                                        <Checkout
                                            spot={spot}
                                            onHeaderTextClick={this._onCloseModal}
                                            headerText="&lt; Back to Search"
                                        />
                                    </Layer>
                                }
                            </>
                        );
                    })}
                </Box>
            </Box>
        );
    }
}
