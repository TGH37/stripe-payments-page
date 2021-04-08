import { useContext, useEffect, useState } from 'react'

import { GlobalContext } from '../contexts/globalState'
import { PricingContext } from '../contexts/pricingState'
import ProductVariant from '../classes/variant'

function ProductCardPricing() {
  const { activeProductData, 
          activeBasketProductIndex, 
          hoverBasketProductIndex, 
          updateActiveBasketItem, 
          setActiveBasketProductIndex, 
          setHoverBasketProductIndex, 
          addVariant,
          removeVariant } = useContext(GlobalContext);

  const { productTotalPricingData } = useContext(PricingContext);

  const [count, setCount] = useState(activeProductData.basketItem.variants.length);
  
  const incrementBtnOnClickHandler = async () => {
    await addVariant(new ProductVariant('black-red', activeProductData.dbItem))
    setCount(prev => prev +=1)
  }
  const decrementBtnOnClickHandler = async () => {
    await removeVariant(activeBasketProductIndex);
  }

  useEffect(() => {
    setActiveBasketProductIndex(prev => {return {...prev, variantIdx: activeProductData.basketItem.variants.length - 1}})
    setHoverBasketProductIndex(prev => {return {...prev, variantIdx: activeProductData.basketItem.variants.length - 1}})
  }, [count])
 
  useEffect(() => updateActiveBasketItem(), [activeBasketProductIndex]);

  return (
    <div className="row align-items-end">
      <div className="col-9">
        <div className='d-flex flex-gap'>
          <h5 className="text-decoration-line-through text-danger">£{productTotalPricingData.priceArry[hoverBasketProductIndex.variantIdx]}</h5>
          {/* <h5 className="ps-2">£{productTotalPricingData.priceArry_discounted[hoverBasketProductIndex.variantIdx]}</h5> */}
        </div>
        <div className="d-flex flex-row align-items-end">
          <h2>£{productTotalPricingData.priceArry_discounted[hoverBasketProductIndex.variantIdx]}</h2>
          <small className="ps-2">(Avg: £{productTotalPricingData.avg_discounted} Each)</small>
        </div>
      </div>
      <div className="col-2 p-2 d-flex flex-row align-items-center">
        <button type="button" className="btn btn-outline-secondary " onClick={() =>decrementBtnOnClickHandler()}>-</button>
        <span className="ps-2 pe-2">{activeProductData.basketItem.variants.length}</span>
        <button type="button" className="btn btn-outline-secondary " onClick={() =>incrementBtnOnClickHandler()}>+</button>
      </div>
    </div>
  )
}

export default ProductCardPricing
