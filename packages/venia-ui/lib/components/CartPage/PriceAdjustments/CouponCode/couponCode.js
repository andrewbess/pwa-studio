import React, { Fragment } from 'react';

import { useCouponCode } from '@magento/peregrine/lib/talons/CartPage/PriceAdjustments/useCouponCode';
import Button from '../../../Button';
import { mergeClasses } from '../../../../classify';
import defaultClasses from './couponCode.css';
import { Form } from 'informed';
import Field from '../../../Field';
import TextInput from '../../../TextInput';
import {
    GET_APPLIED_COUPONS,
    APPLY_COUPON_MUTATION,
    REMOVE_COUPON_MUTATION
} from './couponCode.graphql';

const CouponCode = props => {
    const classes = mergeClasses(defaultClasses, props.classes);

    const talonProps = useCouponCode({
        applyCouponMutation: APPLY_COUPON_MUTATION,
        getAppliedCouponsQuery: GET_APPLIED_COUPONS,
        removeCouponMutation: REMOVE_COUPON_MUTATION
    });

    const {
        applyError,
        applyingCoupon,
        data,
        fetchError,
        handleApplyCoupon,
        handleRemoveCoupon,
        removingCoupon
    } = talonProps;

    if (!data) {
        return null;
    }

    if (fetchError) {
        console.log(fetchError);
        return 'Something went wrong. Refresh and try again.';
    }

    if (data.cart.applied_coupons) {
        const codes = data.cart.applied_coupons.map(({ code }) => {
            return (
                <Fragment key={code}>
                    <span>{code}</span>
                    <button
                        className={classes.removeButton}
                        disabled={removingCoupon}
                        onClick={() => {
                            handleRemoveCoupon(code);
                        }}
                    >
                        Remove
                    </button>
                </Fragment>
            );
        });

        return <div>{codes}</div>;
    } else {
        return (
            <Form className={classes.entryForm} onSubmit={handleApplyCoupon}>
                <Field id="couponCode" label="Coupon Code">
                    <TextInput
                        field="couponCode"
                        id={'couponCode'}
                        placeholder={'Enter code'}
                        mask={value => value && value.trim()}
                        maskOnBlur={true}
                        message={
                            applyError ? 'An error occurred. Try again.' : ''
                        }
                    />
                </Field>
                <Field>
                    <Button
                        classes={{ root_normalPriority: classes.applyButton }}
                        disabled={applyingCoupon}
                        priority={'normal'}
                        type={'submit'}
                    >
                        {'Apply'}
                    </Button>
                </Field>
            </Form>
        );
    }
};

export default CouponCode;
