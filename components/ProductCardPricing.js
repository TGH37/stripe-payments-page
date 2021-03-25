import { useContext, useEffect, useState } from 'react'

// import useIncrement from '../contexts/useIncrement'
import { GlobalContext } from '../contexts/globalState'
import ProductVariant from '../classes/variant'

function ProductCardPricing() {
  const { activeBasketItem, 
          hoverBasketProductIndex, 
          activeBasketProductIndex, 
          updateActiveBasketItem, 
          setActiveBasketProductIndex, 
          sumVariantPrices, 
          computeLowestDiscountPrice, 
          addVariant,
          removeVariant } = useContext(GlobalContext);
          
  const currentBasketVariantData = activeBasketItem.basketItem.variants[hoverBasketProductIndex.variantIdx];
  const maxDiscount = computeLowestDiscountPrice(currentBasketVariantData.productID)
  const discountedVariantPrice = currentBasketVariantData.pricing.priceGBP - (currentBasketVariantData.pricing.priceGBP * ( maxDiscount / 100));
  const discountedTotalPrice = (sumVariantPrices() - (sumVariantPrices() * ( maxDiscount / 100))).toFixed(2);
  const averagePrice = (discountedTotalPrice / activeBasketItem.basketItem.variants.length).toFixed(2)

  const [count, setCount] = useState(activeBasketItem.basketItem.variants.length);
  
  const incrementBtnOnClickHandler = async () => {
    await addVariant(new ProductVariant('black-red', activeBasketItem.dbItem))
    setCount(prev => prev +=1)
  }
  const decrementBtnOnClickHandler = async () => {
    await removeVariant(activeBasketProductIndex);
  }

  useEffect(() => {
    setActiveBasketProductIndex(prev => {return {...prev, variantIdx: activeBasketItem.basketItem.variants.length - 1}})
  }, [count])
 
  useEffect(() => updateActiveBasketItem(), [activeBasketProductIndex]);

  return (
    <div className="row align-items-end">
      <div className="col-9">
        <div className='d-flex flex-gap'>
          <h5 className="text-decoration-line-through text-danger">£{sumVariantPrices().toFixed(2)}</h5>
          <h5 className="ps-2">£{discountedTotalPrice}</h5>

        </div>
        <div className="d-flex flex-row align-items-end">
          <h2>£{discountedVariantPrice.toFixed(2)}</h2>
          <small className="ps-2">(Avg: £{averagePrice} Each)</small>
        </div>
      </div>
      <div className="col-2 p-2 d-flex flex-row align-items-center">
        <button type="button" className="btn btn-outline-secondary " onClick={() =>decrementBtnOnClickHandler()}>-</button>
        <span className="ps-2 pe-2">{activeBasketItem.basketItem.variants.length}</span>
        <button type="button" className="btn btn-outline-secondary " onClick={() =>incrementBtnOnClickHandler()}>+</button>
      </div>
    </div>
  )
}

export default ProductCardPricing
