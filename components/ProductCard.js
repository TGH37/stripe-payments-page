import { useContext, useEffect, useState } from 'react'

import {GlobalContext} from '../contexts/globalState'
import Image from 'next/image'
import ProductCardVariantTab from './ProductCardVariantTab';
import ProductCardPricing from './ProductCardPricing';

function ProductCard() {
  const { activeDatabaseProduct, activeProductData, hoverBasketProductIndex, setHoverBasketProductIndex, setActiveBasketProductIndex, activeBasketProductIndex } = useContext(GlobalContext);
  const currentVariant = activeProductData.basketItem.variants[hoverBasketProductIndex.variantIdx]
  const imgSrc = `/../public/${currentVariant.imgSrcs}`
  const [formSelection, setFormSelection] = useState({variantName: currentVariant.variantName, size: currentVariant.size})

  useEffect(() => {
    setFormSelection({variantName: currentVariant.variantName, size: currentVariant.size});
  }, [hoverBasketProductIndex])

  const tabHoverHandler = (idx) => {
    setHoverBasketProductIndex({productIdx: activeBasketProductIndex.productIdx, variantIdx: idx});
  }

  const tabMouseLeaveHandler = () => {
     setHoverBasketProductIndex({productIdx: activeBasketProductIndex.productIdx, variantIdx: activeBasketProductIndex.variantIdx});
  }
  const tabClickHandler = () => {
    setActiveBasketProductIndex(hoverBasketProductIndex)
  }

  return (
    <div className="card overflow-hidden">
      <h3 className='card-title p-2 m-0 bg-primary text-white'>{activeDatabaseProduct.nomenclature.productName}</h3>
      <div className="card-body">
        <div className="position-relative mb-2 overflow-hidden" style={{width: "100%"}}>
          <Image className="img-fluid rounded-circle" src={imgSrc} width={500} height={400}/>
          <button className="btn btn-primary position-absolute" style={{bottom: "5%", right: "5%"}}>Visit Page</button>
        </div>
        <div>
          <h5>{activeDatabaseProduct.description.card.header}</h5>
          <p>{activeDatabaseProduct.description.card.body}</p>
        </div>
        <div className="row align-items-center justify-content-around mb-4">
          <button className="col btn btn-light me-1 d-flex flex-row align-items-center justify-content-center">
            <i className="bi-star-fill" style={{fontSize: "1.5rem", color: "gold"}}></i>
            <span className="ps-1">{activeDatabaseProduct.feedback.reviews.length}</span>
          </button>
          <button className="col btn btn-light me-1 d-flex flex-row align-items-center justify-content-center">
            <i className="bi-chat-dots" style={{fontSize: "1.5rem", color: "black"}}></i>
            <span className="ps-1">{activeDatabaseProduct.feedback.comments.length}</span>
          </button>
          <button className="col btn btn-light d-flex flex-row align-items-center justify-content-center">
            <i className="bi-share" style={{fontSize: "1.5rem", color: "black"}}></i>
          </button>
        </div>
        
        <div className="container">
          <div className="mb-2">
            {activeProductData.basketItem.variants.map((btn, idx) => 
              {
                return <button 
                          className="btn btn-primary me-1"
                          key={idx}
                          onMouseEnter={() => tabHoverHandler(idx)} 
                          onMouseLeave={() => tabMouseLeaveHandler()}
                          onClick={() => tabClickHandler()}
                        >tab{idx + 1}</button>
              })
            }           
          </div>
          <form className="mb-4">
            <ProductCardVariantTab currentSettings={activeProductData} availableSettings={activeDatabaseProduct} formSelection={formSelection} setFormSelection={setFormSelection}/>
          </form>
          
          <ProductCardPricing />
        </div>
      </div>
    </div>
  )
}

export default ProductCard
