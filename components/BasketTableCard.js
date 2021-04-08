import { useContext } from 'react'
import BasketTable from './BasketTable'
import {GlobalContext} from '../contexts/globalState'
import { PricingContext } from '../contexts/pricingState'
import { loadStripe } from '@stripe/stripe-js';

function BasketTableCard() {
  const { basketItemsArry } = useContext(GlobalContext)
  const { stripeLineItems, updateStripeLineItems } = useContext(PricingContext)
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  // const handleCheckoutClick = async (e) => {
  //   e.preventDefault();
  //   const requestData = {
  //     line_items: stripeLineItems
  //   };

  // // Create a Checkout Session.
  // await fetch(
  //     '/api/checkout_sessions',
  //     { method: 'POST',
  //       headers: {'Content-Type': 'application/json'},
  //       body: JSON.stringify(requestData),
  //     },
  //   )
  // }
  const handleCheckoutClick = async (e) => {
    e.preventDefault();
    const stripe = await stripePromise;
    const requestData = {
          line_items: stripeLineItems
        };
    
      // Create a Checkout Session.
      const response = await fetch(
          '/api/checkout_sessions',
          { method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(requestData),
          },
        )

      const session = await response.json();
      
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
  }
  
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title text-capitalize">Shopping Basket</h4>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus eveniet nihil iure reiciendis assumenda fugiat odit harum placeat quo repellendus?</p>
        <BasketTable />
        <button type="button" className="btn btn-primary btn-sm text-capitalize" onClick={(e) => handleCheckoutClick(e)}>checkout</button>
        <button type="button" className="btn btn-secondary btn-sm text-capitalize">back to store</button>
      </div>
    </div>
    )
}

export default BasketTableCard
