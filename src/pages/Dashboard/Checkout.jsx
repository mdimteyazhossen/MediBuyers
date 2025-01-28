import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import Checkoutfrom from './Checkoutfrom'


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)
const Checkout = () => {
    return (
        <div>
            <h2 className="text-4xl">Payment</h2>
            <div>
                <Elements stripe={stripePromise}>
                    <Checkoutfrom/>
                </Elements>
            </div>
        </div>
    )
}

export default Checkout
