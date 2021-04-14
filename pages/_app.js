import '../styles/globals.css'
import Head from 'next/head'
import { GlobalProvider } from '../contexts/globalState'
import { PricingProvider } from '../contexts/pricingState'
import { SubscriptionProvider } from '../contexts/subscriptionState'
import Navbar from '../components/Navbar'


function MyApp({ Component, pageProps,}, {props: isConnected }) {

  return (
    <>
      <GlobalProvider>
        <Head >
          <title>TH | Stripe payment app</title>
          <meta name="SEO Keywords" content="Web dev programming"/>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous"/>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.0/font/bootstrap-icons.css"/>

        </Head>
        <PricingProvider>
          <SubscriptionProvider>

          <Navbar/>
          <Component {...pageProps} />
          </SubscriptionProvider>
        </PricingProvider>
      </GlobalProvider>
    </>
  )
}

export default MyApp