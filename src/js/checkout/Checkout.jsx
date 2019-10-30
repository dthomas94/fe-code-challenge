/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, TextInput, Text, MaskedInput } from 'grommet';
import TextButton from 'common/TextButton';
import SpotItem from 'spot/SpotItem';
import * as yup from 'yup';
import { Form, withFormik } from 'formik';
import axios from 'axios';

const validationSchema = yup.object().shape({
    firstName: yup.string().min(1),
    lastName: yup.string().min(1),
    email: yup.string().email('Please enter a valid email')
        .required('Please enter a valid email'),
    phone: yup.string().matches(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/, 'Please enter a valid phone number')
        .required('Please enter a valid phone number'),
});

const CheckoutForm = ({
    spot,
    onHeaderTextClick,
    headerText,
    errors,
    values,
    handleChange,
    setFieldValue,
    isSubmitting,
    openCheckoutModal
}) => {

    return (
        <Form>
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
                        <Text color={(errors.firstName) ? 'red' : 'grey'}>First Name</Text>
                        <TextInput
                            name="firstName"
                            borderColor={(errors.firstName) ? 'red' : 'transparent'}
                            pad="0"
                            value={values.firstName}
                            onChange={handleChange}
                        />
                        <Text color="red">{errors.firstName}</Text>
                    </Box>
                    <Box
                        pad={{ vertical: 'xsmall' }}
                        flex="grow"
                    >
                        <Text color={(errors.lastName) ? 'red' : 'grey'}>Last Name</Text>
                        <TextInput
                            name="lastName"
                            borderColor={(errors.lastName) ? 'red' : 'transparent'}
                            pad="0"
                            value={values.lastName}
                            onChange={handleChange}
                        />
                        <Text color="red">{errors.lastName}</Text>
                    </Box>
                    <Box
                        pad={{ vertical: 'xsmall' }}
                        flex="grow"
                    >
                        <Text color={(errors.email) ? 'red' : 'grey'}>Email</Text>
                        <TextInput
                            name="email"
                            borderColor={(errors.email) ? 'red' : 'transparent'}
                            pad="0"
                            value={values.email}
                            onChange={handleChange}
                        />
                        <Text color="red">{errors.email}</Text>
                    </Box>
                    <Box
                        pad={{ vertical: 'xsmall' }}
                        flex="grow"
                    >
                        <Text color={(errors.phone) ? 'red' : 'grey'}>Phone Number</Text>
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
                            value={values.phone}
                            onChange={event => {
                                setFieldValue('phone', event.target.value);
                            }}
                            name="phone"
                            borderColor={(errors.phone) ? 'red' : 'transparent'}
                        />
                        <Text color="red">{errors.phone}</Text>
                    </Box>
                    <Button
                        disabled={isSubmitting}
                        type="submit"
                        label={(isSubmitting) ? 'Submitting' : `Purchase for ${spot.price / 100}`}
                    />
                </Box>
            </Box>
        </Form>
    );
};

CheckoutForm.propTypes = {
    spot: PropTypes.object.isRequired,
    openCheckoutModal: PropTypes.func.isRequired,
    headerText: PropTypes.string,
    errors: PropTypes.object,
    values: PropTypes.object,
    handleChange: PropTypes.func,
    setFieldValue: PropTypes.func,
    isSubmitting: PropTypes.bool,
    onCloseDetailsModal: PropTypes.func,
};

const Checkout = withFormik({
    mapPropsToValues: () => ({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    }),
    handleSubmit: async (values, { props, setSubmitting }) => {

        await axios.post('/reservations', {
            spotId: props.spot.id,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phone: values.phone
        })
            .then(response => {
                setSubmitting(false);
                props.onCloseDetailsModal();
                props.openCheckoutModal(false);
            })
            .catch(err => {
                setSubmitting(false);
                throw new Error(err);
            });
    },
    validationSchema,
    validateOnChange: true,
    enableReinitialize: true,
})(CheckoutForm);

export default Checkout;
