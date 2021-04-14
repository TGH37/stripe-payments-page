import React, { useState, useContext, useRef } from 'react'
import Link from 'next/link'
import { SubscriptionContext }from '../contexts/subscriptionState'

// React-Bootstrap modal tutorial: https://dev.to/tefoh/use-bootstrap-5-in-react-2l4i

function SubscriptionCard({ title, price, featureList, predecessor }) {
  const { modal } = useContext(SubscriptionContext);
  const [isMonthlySelected, setIsMonthlySelected] = useState(true);

  // const price = isMonthlySelected ? `£${subscriptionPrices[title].monthly.toFixed(2)}` : `£${subscriptionPrices[title].annual.toFixed(2)}`
  const togglePrice = isMonthlySelected ? `£${price.monthly.toFixed(2)}` : `£${price.annual.toFixed(2)}`

  // const tierBelow = predecessor ? subscriptionTiers[subscriptionTiers.indexOf(title) - 1] : null;
  // const predecessor = subscriptionTiers[subscriptionTiers.indexOf(title) - 1]
  const listCheckmark = <i className="bi-check pe-2" style={{color: 'green', display: 'inline'}}></i>

  const subscriptionFeatures = () => featureList.map(feature => <li key={feature} className='list-group-item'>{listCheckmark}{feature}</li>)
  const clickHandler = () => setIsMonthlySelected(!isMonthlySelected)

  const learnMoreClickHandler = () => {
    return 
  }

  return (
    <div className="col-sm">
      <div className="card h-100 text-center">
        <h1 className="card-title p-2 text-capitalize">{title}</h1>
        <main className='card-body'>
          <p className='card-text'>Description</p>
          <h2>{togglePrice}</h2>
          <div className='container px-5'>
            <div className='row gx-5'>
              <div className='col'><button className={`w-100 btn btn-outline-secondary ${isMonthlySelected ? 'active' : ''}`} onClick={() => clickHandler()}>Monthly</button></div>
              <div className='col'><button className={`w-100 btn btn-outline-secondary ${!isMonthlySelected ? 'active' : ''}`} onClick={() => clickHandler()}>Annual</button></div>
            </div>
          </div>
          <div className='container py-4'>
            <ul className='text-start list-group-flush'>
              {predecessor ? <li className='list-group-item'>{listCheckmark}<strong>{`Everything in ${predecessor} and...`}</strong></li> : null}
              {subscriptionFeatures()}
            </ul>
          </div>
        </main>

        <footer className='card-footer'>
          <button className='btn btn-dark' type='button' onClick={() => modal.show()}>Get Started</button>
          <h6><Link href='/'><a onClick={() => learnMoreClickHandler()} >Learn More...</a></Link></h6>
          {/* FIXME: when you navigate back to the homepage through this link, the active tab does not update on the navbar */}
        </footer>
      </div>     
    </div>
  )
}

export default SubscriptionCard
