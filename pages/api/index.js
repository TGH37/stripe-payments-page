// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


import { connectToDatabase } from '../../util/mongodb'


export default async function handler(req, res) {
  const { db } = await connectToDatabase()
  const dbQueryRaw = await db.collection('subscriptions').find({}).toArray()
  const dbQuery = JSON.parse(JSON.stringify(dbQueryRaw));

  const pricingArry = dbQuery.map(subscription => {
    return {[subscription.name]: subscription.price}
  })
  const pricing = Object.assign({}, ...pricingArry)

  const fullDataArry = dbQuery.map(subscription => {
    return {[subscription.name]: {
      name: subscription.name,
      price: subscription.price,
      features: subscription.features
    }}
  })
  const fullData = Object.assign({}, ...fullDataArry)
  res.json(fullData)
}