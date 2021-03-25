import Head from 'next/head'
import styles from '../styles/Home.module.css'


import React, { useEffect, useRef, useState } from 'react'
import BasketTable from '../components/BasketTable'
import ProductCard from '../components/ProductCard'

import products from '../database/products.json'

import Navbar from '../components/Navbar'
// import CardImage from '../public/assets/nike-shoes-red.jpg'

export default function Home() {

  const [activeProduct, setActiveProduct] = useState(false);


  useEffect(() => {
    // setActiveProduct(activeProductRef.current.firstChild.children[1].innerHTML)
  },[]);

  return (
      <div className={styles.container}>
      <Navbar />
      <header className="container text-center">
        <h1 className="page-header">Hello, world!</h1>

      </header>
      <main className="container-fluid">
        <div className="row">
          <section className="col-sm">
            <ProductCard />
          </section>


          {/* <section className="col-sm">
            <div className="card">
              <h4 className='card-title'>Frequently Bought With</h4>
              <div className="row">
                <div className="col">1</div>
                <div className="col">2</div>
              </div>
              <div className="row">
                <div className="col">3</div>
                <div className="col">4</div>
                <div className="col">5</div>
              </div>
              <div className="row">
                <div className="col">6</div>
                <div className="col">7</div>
              </div>
            </div>
          </section> */}
            
            <section className="col-sm-8">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title text-capitalize">Shopping Basket</h4>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus eveniet nihil iure reiciendis assumenda fugiat odit harum placeat quo repellendus?</p>
                  <BasketTable />
                
                <button type="button" className="btn btn-primary btn-sm text-capitalize">checkout</button>
                <button type="button" className="btn btn-secondary btn-sm text-capitalize">back to store</button>
              </div>
            </div>
          </section>
          </div>
        </main>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossOrigin="anonymous"></script>
      </div>
  )
}
