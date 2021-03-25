import { useContext } from 'react'

import {GlobalContext} from '../contexts/globalState'
import Image from 'next/image'
import ProductCardVariantTab from './ProductCardVariantTab';
import ProductCardPricing from './ProductCardPricing';

function ProductCard() {
  const { activeBasketProduct, activeBasketItem } = useContext(GlobalContext);
  return (
    <div className="card overflow-hidden">
      <h3 className='card-title p-2 m-0 bg-primary text-white'>{activeBasketProduct.nomenclature.productName}</h3>
      <div className="card-body">
        <div className="position-relative mb-2 overflow-hidden" style={{width: "100%"}}>
          <Image className="img-fluid rounded-circle" src='/../public/assets/nike-shoes.jpg' width={500} height={400}/>
          <button className="btn btn-primary position-absolute" style={{bottom: "5%", right: "5%"}}>Visit Page</button>
        </div>
        <div>
          <h5>{activeBasketProduct.description.card.header}</h5>
          <p>{activeBasketProduct.description.card.body}</p>
        </div>
        <div className="row align-items-center justify-content-around mb-4">
          <button className="col btn btn-light me-1 d-flex flex-row align-items-center justify-content-center">
            <i className="bi-star-fill" style={{fontSize: "1.5rem", color: "gold"}}></i>
            <span className="ps-1">{activeBasketProduct.feedback.reviews.length}</span>
          </button>
          <button className="col btn btn-light me-1 d-flex flex-row align-items-center justify-content-center">
            <i className="bi-chat-dots" style={{fontSize: "1.5rem", color: "black"}}></i>
            <span className="ps-1">{activeBasketProduct.feedback.comments.length}</span>
          </button>
          <button className="col btn btn-light d-flex flex-row align-items-center justify-content-center">
            <i className="bi-share" style={{fontSize: "1.5rem", color: "black"}}></i>
          </button>
        </div>
        
        <div className="container">
          <div className="mb-2">
            <button className="btn btn-primary me-1">tab1</button>
            <button className="btn btn-primary">tab2</button>
          </div>
          <form className="mb-4">
            <ProductCardVariantTab currentSettings={activeBasketItem} availableSettings={activeBasketProduct}/>
          </form>
          
          <ProductCardPricing />
        </div>
      </div>
    </div>
  )
}

export default ProductCard
