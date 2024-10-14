import Stripe from 'stripe'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
if (stripeSecretKey == undefined) {
    throw new Error('STRIPE_SECRET_KEY is not defined')
}

const stripe = new Stripe(stripeSecretKey)

export default stripe
