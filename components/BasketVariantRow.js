import { useContext, useEffect } from 'react'

import { GlobalContext } from '../contexts/globalState'
import useDiscount from '../hooks/useDiscount'

function BasketVariantRow({ data, nominalPrice, idx, parentIdx, productID }) {
  const { hoverBasketProductIndex, setHoverBasketProductIndex, activeBasketProductIndex, setActiveBasketProductIndex, computeLowestDiscountPrice } = useContext(GlobalContext);
  const variantPrice = data.pricing.priceGBP ? data.pricing.priceGBP : nominalPrice

  const semanticIdx = parseFloat(parentIdx + 1) + ((idx + 1) / 10);

  const maxDiscount = computeLowestDiscountPrice(productID)
  const discountedVariantPrice = variantPrice - (variantPrice * ( maxDiscount / 100));
  
  const hoverHandler = () => {
    setHoverBasketProductIndex({productIdx: parentIdx, variantIdx: idx});
  }

  const mouseLeaveHandler = () => {
     setHoverBasketProductIndex({productIdx: activeBasketProductIndex.productIdx, variantIdx: activeBasketProductIndex.variantIdx});
  }

  const clickHandler = () => {
    setActiveBasketProductIndex(hoverBasketProductIndex)
  }

  return (
    // <tr className="table-success table-striped fw-light text-muted" onMouseEnter={() => hoverHandler()} onMouseLeave={() => mouseLeaveHandler()}>
    <tr 
      className={idx === activeBasketProductIndex.variantIdx ? "table-danger" : ""} 
      onMouseEnter={() => hoverHandler()} 
      onMouseLeave={() => mouseLeaveHandler()}
      onClick={() => clickHandler()}
    >
      <th scope="row" className='ps-4'>{semanticIdx}</th>
      <td className='ps-4'>{data.variantName}</td>
      <td className='ps-4'>£{discountedVariantPrice.toFixed(2)}</td>
      <td className='ps-4'></td>
      <td className='ps-4'>£{discountedVariantPrice.toFixed(2)}</td>
      <td className='ps-4'><input type="checkbox"/></td>
    </tr>
  )
}

export default BasketVariantRow
