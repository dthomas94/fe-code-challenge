/* eslint-disable react/jsx-no-bind */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, TextInput, Text, MaskedInput } from 'grommet';
import TextButton from 'common/TextButton';
import SpotItem from 'spot/SpotItem';
import useForm from 'react-hook-form';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    email: yup.string().email(),
    phone: yup.string().matches(/^\+?[0-9]{10,11}$/),
});

const Checkout = ({
    spot,
    onHeaderTextClick,
    headerText
}) => {
    const { handleSubmit, register, errors, getValues, setValue, setError, formState } = useForm({
        validationSchema,
    });
    const formValues = getValues();
    // register 3rd party inputs
    useEffect(() => {
        register({ name: 'firstName' });
        register({ name: 'lastName' });
        register({ name: 'email' });
        register({ name: 'phone' });
    }, [register]);

    const { isSubmitting } = formState;

    const handleOnSubmit = async values => {
        await validationSchema.validate(values).catch(err => {
            err.errors.forEach(error => {
                setError({
                    name: error.values[0],
                    message: error.key,
                    type: 'warning'
                });
            }); // => [{ key: 'field_too_short', values: { min: 18 } }]
        });
    };

    return (
        <Box onSubmit={handleSubmit(handleOnSubmit)}>
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
                width="medium"
                background="white"
            >
                <SpotItem
                    key={`checkout-spot-${spot.id}`}
                    data={spot}
                    showDetails={false}
                />
                <Box as="form">
                    <Box
                        pad={{ vertical: 'xsmall' }}
                        flex="grow"
                    >

                        <TextInput
                            name="firstName"
                            borderColor="transparent"
                            pad="0"
                            value={formValues.firstName}
                            onChange={newValue => {
                                setValue('firstName', newValue);
                            }}
                        />
                        {errors.firstName && <Text color="red">{errors.firstName.message}</Text>}
                    </Box>
                    <Box
                        pad={{ vertical: 'xsmall' }}
                        flex="grow"
                    >

                        <TextInput
                            name="lastName"
                            borderColor="transparent"
                            pad="0"
                            value={formValues.lastName}
                            onChange={newValue => {
                                setValue('lastName', newValue);
                            }}
                        />
                        {errors.lastName && <Text color="red">{errors.lastName.message}</Text>}
                    </Box>
                    <Box
                        pad={{ vertical: 'xsmall' }}
                        flex="grow"
                    >

                        <TextInput
                            name="email"
                            borderColor="transparent"
                            pad="0"
                            value={formValues.email}
                            onChange={newValue => {
                                setValue('email', newValue);
                            }}
                        />
                        {errors.email && <Text color="red">{errors.email.message}</Text>}
                    </Box>
                    <Box
                        pad={{ vertical: 'xsmall' }}
                        flex="grow"
                    >
                        <MaskedInput
                            mask={[
                                { fixed: '(' },
                                {
                                    length: 3,
                                    regexp: /^[0-9]{1,3}$/,
                                    placeholder: 'xxx',
                                },
                                { fixed: ')' },
                                { fixed: ' ' },
                                {
                                    length: 3,
                                    regexp: /^[0-9]{1,3}$/,
                                    placeholder: 'xxx',
                                },
                                { fixed: '-' },
                                {
                                    length: 4,
                                    regexp: /^[0-9]{1,4}$/,
                                    placeholder: 'xxxx',
                                },
                            ]}
                            value={formValues.phone}
                            onChange={event => {
                                setValue('phone', event.target.value);
                            }}
                            name="phone"
                        />
                        {errors.phone && <Text color="red">{errors.phone.message}</Text>}
                    </Box>
                    <Button
                        disabled={isSubmitting}
                        type="submit"
                    >
                        {(isSubmitting) ? 'Submitting' : `Purchase for ${spot.price}`}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

Checkout.propTypes = {
    spot: PropTypes.object.isRequired,
    onHeaderTextClick: PropTypes.func.isRequired,
    headerText: PropTypes.string,
};

export default Checkout;
