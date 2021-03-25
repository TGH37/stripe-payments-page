import { useContext } from 'react'

import { GlobalContext } from '../contexts/globalState'
import BasketVariantRow from './BasketVariantRow'

function BasketRow({ idx, name, localePrice, variants, productID }) {
  const qty = variants.length
  const { setHoverBasketProductIndex,
          activeBasketProductIndex,
          // basketItemsArry,
          sumVariantPrices, 
          computeLowestDiscountPrice } = useContext(GlobalContext)
  const maxDiscount = computeLowestDiscountPrice(productID)
  const productTotalPrice = sumVariantPrices();
    
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
  
  const discountedProductTotalPrice = productTotalPrice - (productTotalPrice * ( maxDiscount / 100));

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
        <td>£{discountedProductTotalPrice.toFixed(2)}</td>
        <td>{qty}</td>
        <td>£{discountedProductTotalPrice.toFixed(2)}</td>
        <td><input type="checkbox"/></td>
      </tr>
      {variantRows()}
    </>
  )
}

export default BasketRow
