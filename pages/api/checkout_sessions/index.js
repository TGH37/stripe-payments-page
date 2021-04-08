import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const lineItemsIn = req.body.line_items
  const sessionParams = {
    mode: 'payment',
    payment_method_types: ['card'],
    // line_items: [
    //   {
    //     name: `${productID}_${variantName}`,
    //     amount: 100, // 100 = £1, 1 = £0.01
    //     currency: 'gbp',
    //     quantity: 1,
    //   },
    // ],
    line_items: lineItemsIn,
    success_url: `${req.headers.origin}`,
    cancel_url: `${req.headers.origin}`
  };
  try {
    const session = await stripe.checkout.sessions.create(sessionParams);
    res.json({id: session.id})
  } catch (err) {
    console.error(err)
  }

}