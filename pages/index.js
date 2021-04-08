import Head from 'next/head'
import styles from '../styles/Home.module.css'
// import { loadStripe } from '@stripe/stripe-js';
// const loadInStripe = async () => await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
// const stripe = loadInStripe();

import React, { useEffect, useRef, useState } from 'react'
import BasketTableCard from '../components/BasketTableCard'
import ProductCard from '../components/ProductCard'

import Navbar from '../components/Navbar'

export default function Home() {

  const [activeProduct, setActiveProduct] = useState(false);

  return (
      <div className={styles.container}>
      <Navbar />
      <header className="container text-center">

      </header>
      <main className="container-fluid">
        <div className="row">
          <section className="col-sm">
            <ProductCard />
          </section>
          <section className="col-sm-8">
            <BasketTableCard />
          </section>
          </div>
        </main>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossOrigin="anonymous"></script>
      </div>
  )
}
