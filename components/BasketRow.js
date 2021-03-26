import { useContext } from 'react'

import { GlobalContext } from '../contexts/globalState'
import BasketVariantRow from './BasketVariantRow'
import useDiscount from '../hooks/useDiscount'

function BasketRow({ idx, name, localePrice, variants, productID }) {
  const qty = variants.length
  const { setHoverBasketProductIndex, activeBasketProductIndex } = useContext(GlobalContext)
  const priceData = useDiscount();
    
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
    setHoverBasketProductIndex((prev) => {
      console.log({productIdx: idx, ...prev})
      return {productIdx: idx, ...prev}
    });
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
        <th scope="row">{idx + 1}</th>
        <td>{name}</td>
        <td>£{priceData.discountedTotalPrice}</td>
        <td>{qty}</td>
        <td>£{priceData.discountedTotalPrice}</td>
        <td><input type="checkbox"/></td>
      </tr>
      {variantRows()}
    </>
  )
}

export default BasketRow
