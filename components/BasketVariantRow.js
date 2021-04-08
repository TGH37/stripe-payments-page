import { useContext, useState } from 'react'
import styles from '../styles/Home.module.css'

import { GlobalContext } from '../contexts/globalState'
import { PricingContext } from '../contexts/pricingState'

function BasketVariantRow({ data, nominalPrice, idx, parentIdx, productID }) {
  const { hoverBasketProductIndex, setHoverBasketProductIndex, activeBasketProductIndex, setActiveBasketProductIndex, addVariant } = useContext(GlobalContext);
  const { productTotalPricingData } = useContext(PricingContext);
  const [shouldDisplayAddSymbol, setShouldDisplayAddSymbol] = useState(false);
  const semanticIdx = parseFloat(parentIdx + 1) + ((idx + 1) / 10);
 
  // const styles = 'cursor-pointer '
  const hoverHandler = () => {
    setHoverBasketProductIndex({productIdx: parentIdx, variantIdx: idx});
    setShouldDisplayAddSymbol(true);
  }
  
  const mouseLeaveHandler = () => {
    setHoverBasketProductIndex({productIdx: activeBasketProductIndex.productIdx, variantIdx: activeBasketProductIndex.variantIdx});
    setShouldDisplayAddSymbol(false);
  }

  const rowClickHandler = () => {
    setActiveBasketProductIndex(hoverBasketProductIndex)
  }

  const addSymbolClickHandler = () => {
    addVariant()
  }

  const addSymbol = <i className={`bi bi-plus-circle ${styles.plusIcon}`} onClick={() => addSymbolClickHandler()}></i>

  return (
    // <tr className="table-success table-striped fw-light text-muted" onMouseEnter={() => hoverHandler()} onMouseLeave={() => mouseLeaveHandler()}>
    <tr 
      // className="table-success table-striped fw-light text-muted"
      className={idx === activeBasketProductIndex.variantIdx ? `table-danger ${styles.variantTableRow}`  : `${styles.variantTableRow}`}
      id="variantTableRow"
      onMouseEnter={() => hoverHandler()} 
      onMouseLeave={() => mouseLeaveHandler()}
      onClick={() => rowClickHandler()}
    >
      <th className={`${styles.plusIcon}`}scope="row">{shouldDisplayAddSymbol ? addSymbol : <i className={styles.spacer}></i>}</th>
      <td className={`ps-4`} scope="row" >{semanticIdx}</td>
      <td className={`ps-4`}>{data.variantName}</td>
      <td className={`ps-4`}>£{productTotalPricingData.priceArry_discounted[idx]}</td>
      <td className={`ps-4`}></td>
      <td className={`ps-4`}>£{productTotalPricingData.priceArry_discounted[idx]}</td>
      <td className={`ps-4`}><input type="checkbox"/></td>
    </tr>
  )
}

export default BasketVariantRow
