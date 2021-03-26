import { useContext, useEffect, useState } from 'react'

import { GlobalContext } from '../contexts/globalState'
import ProductVariant from '../classes/variant'
import useDiscount from '../hooks/useDiscount'

function ProductCardPricing() {
  const { activeProductData, 
          activeBasketProductIndex, 
          updateActiveBasketItem, 
          setActiveBasketProductIndex, 
          setHoverBasketProductIndex, 
          addVariant,
          removeVariant } = useContext(GlobalContext);

  const priceData = useDiscount();

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
          <h5 className="text-decoration-line-through text-danger">£{priceData.totalPrice}</h5>
          <h5 className="ps-2">£{priceData.discountedTotalPrice}</h5>

        </div>
        <div className="d-flex flex-row align-items-end">
          <h2>£{priceData.discountedVariantPrice}</h2>
          <small className="ps-2">(Avg: £{priceData.averagePrice} Each)</small>
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
