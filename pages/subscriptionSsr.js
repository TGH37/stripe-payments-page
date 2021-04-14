import Head from 'next/head'
import { useContext } from 'react'
import dynamic from 'next/dynamic'


import SubscriptionCard from '../components/SubscriptionCard'
import styles from '../styles/Home.module.css'
import {SubscriptionContext} from '../contexts/subscriptionState'
import { connectToDatabase } from '../util/mongodb'

// ModalComponent must be rendered on the client side only as it calls the bootstrap module, 
// which relies on client-side properties such as the 'document' object.
const ModalComponent = dynamic(
  () => import('../components/ModalComponent'),
  { ssr: false }
)

export default function Home({ isConnected, pricing, fullDataArry }) {
  const { setSubscriptionPrices } = useContext(SubscriptionContext);
  if(isConnected) setSubscriptionPrices(pricing);

  const cards = fullDataArry.map(tier => <SubscriptionCard key={tier.name} title={tier.name} featureList={tier.features} />)
  return (
    <div className={styles.container}>
      <h1>{isConnected ? 'Connected' : 'Not Connected'}</h1>
      <main className='container-fluid p-4'>
        <div className='row g-4'>
          {cards}
        </div>
      </main>
      <ModalComponent/>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { client, db } = await connectToDatabase();

  const dbQuery = await db.collection('subscriptions').find({}).toArray();

  // const dbQuery_JSONSerialisable = await JSON.parse(JSON.stringify(dbQueryRaw));

  const pricingArry = dbQuery.map(subscription => {
    return {[subscription.name]: subscription.price}
  })
  const pricing = Object.assign({}, ...pricingArry)

  const fullDataArry = dbQuery.map(subscription => {
    return {
      name: subscription.name,
      price: subscription.price,
      features: subscription.features
    }
  })
  const fullData = Object.assign({}, ...fullDataArry)

  const isConnected = await client.isConnected()

  return {
    props: { isConnected, pricing, fullDataArry },
  }
}
// export async function getServerSideProps(context) {
//   const { client, db } = await connectToDatabase();

//   const dbQuery = await db.collection('subscriptions').find({}).toArray();

//   // const dbQuery_JSONSerialisable = await JSON.parse(JSON.stringify(dbQueryRaw));

//   const pricingArry = dbQuery.map(subscription => {
//     return {[subscription.name]: subscription.price}
//   })
//   const pricing = Object.assign({}, ...pricingArry)

//   const fullDataArry = dbQuery.map(subscription => {
//     return {
//       name: subscription.name,
//       price: subscription.price,
//       features: subscription.features
//     }
//   })
//   const fullData = Object.assign({}, ...fullDataArry)

//   const isConnected = await client.isConnected()

//   return {
//     props: { isConnected, pricing, fullDataArry },
//   }
// }