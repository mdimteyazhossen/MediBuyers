import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxios from './../../hooks/useAxios'
import useCart from './../../hooks/useCart'
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
const Checkoutfrom = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxios();
    const { user } = useAuth();
    const [cart] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: totalPrice })
            .then(res => {
                setClientSecret(res.data.clientSecret)
            })
    }, [axiosSecure, totalPrice])
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement)
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card

        })
        if (error) {
            console.log('payment error', error)
            setError(error.message)

        }
        else {
            console.log('payment method', paymentMethod)
            setError('')
        }
        //conferm payment 
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user.email || 'anonymous',
                    name: user.displayName || 'anonymous',
                }
            }
        });

        if (confirmError) {
            console.error('Error confirming payment:', confirmError.message);
        } else {
            console.log('Payment Intent:', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id)
                setTransactionId(paymentIntent.id)
            }
            //send data is database
            cart.map((carts, index) => {
                const payment = {
                    buyerEmail: user.email,
                    seller: carts?.seller || 'Admin',
                    transactionId: paymentIntent.id,
                    medi: carts.drugName,
                    price: carts.price,
                    quantity: carts.quantity,
                    status: 'pending',
                    date: new Date(),
                    cartId: carts._id
                }
                const res = axiosSecure.post('/payments', payment);

            })


        }


    }
    const navigate = useNavigate()
    const handlePay=()=>{
        navigate('/dashboard/invoice')
    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button onClick={handlePay} type="submit" className="btnbtn-sm bg-gray-600 text-white my-4 py-2 px-6" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-600">{error}</p>
            {transactionId && <p className="text-green-600">Your transaction id is {transactionId}</p>}
        </form>
    )
}

export default Checkoutfrom
