import React, {createContext, useState} from 'react'

const init = {
  
}

export const SubscriptionContext = createContext(init);


export function SubscriptionProvider({ children }) {
  const [modal, setModal] = useState(null)
  const [subscriptionPrices, setSubscriptionPrices] = useState();


  return (
    <SubscriptionContext.Provider
      value={{
        subscriptionPrices, setSubscriptionPrices,
        modal,
        setModal,
      }}
    >
      { children }
    </SubscriptionContext.Provider>
  )
}