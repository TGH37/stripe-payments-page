import { useContext } from 'react'
import styles from '../styles/Home.module.css'

import { GlobalContext } from '../contexts/globalState'
import { PricingContext } from '../contexts/pricingState'
import BasketVariantRow from './BasketVariantRow'

function BasketRow({ idx, name, localePrice, variants, productID }) {
  const qty = variants.length
  const { setHoverBasketProductIndex, activeBasketProductIndex } = useContext(GlobalContext)
  const { getProductTotalPricingData } = useContext(PricingContext);

  const priceData = getProductTotalPricingData(productID);
    
  const variantRows = () => 
  variants.map((variant, variantIdx) => 
    <BasketVariantRow 
      key={variantIdx}
      data={variant} 
      nominalPrice={localePrice} 
      idx={variantIdx} 
      parentIdx={idx}
      productID={productID}
    />)
  

  const hoverHandler = () => {
    setHoverBasketProductIndex((prev) => {return {productIdx: idx, ...prev}});
  }
  const mouseLeaveHandler = () => {
    setHoverBasketProductIndex(activeBasketProductIndex)
  }
 
  return (
    <>
      <tr 
        onMouseEnter={() => hoverHandler()} 
        onMouseLeave={() => mouseLeaveHandler()} 
        className={idx === activeBasketProductIndex.productIdx ? "table-danger" : ""}
      >
        <th scope="row"></th>
        <td>{idx + 1}</td>
        <td>{name}</td>
        <td>£{priceData.sum_discounted}</td>
        <td>{qty}</td>
        <td>£{priceData.sum_discounted}</td>
        <td><input type="checkbox"/></td>
      </tr>
      {variantRows()}
    </>
  )
}

export default BasketRow
