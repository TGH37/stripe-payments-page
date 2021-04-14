import { useContext } from 'react'

import { GlobalContext } from '../contexts/globalState'
import ProductVariant from '../classes/variant'

function ProductCardVariantTab({ formSelection }) {
  const { activeProductData, hoverBasketProductIndex, activeBasketProductIndex } = useContext(GlobalContext);
  const activeVariant = activeProductData.basketItem.variants[hoverBasketProductIndex.variantIdx];

  const onChangeHandler = event => {
    
  }
// FIXME: when a variant is deleted, if that is the active variant, it will not update the product card price
  return (
    <div className="row row-cols-2  gy-2 align-items-center">
      <label className="col-3 text-end">Variant:</label>

      <div className="col-9">
        <select className="form-select" aria-label="Default select example" value={formSelection.variantName} onChange={event => onChangeHandler(event)}>
          { activeProductData.dbItem.availableVariantNames.map((variantName, idx) => <option key={idx} value={variantName}>{variantName}</option>) }
        </select>
      </div>
      
      <label className="col-3 text-end">Size:</label>
      
      <div className="col-9">
        <div className="dropdown">
          <select className="form-select" aria-label="Default select example" defaultValue={formSelection.size}>
          { activeVariant.availableSizes.map((size, idx) => <option key={idx} value={size}>{size}</option>) }
        </select>
        </div>
      </div>
    </div>
  )
}

export default ProductCardVariantTab
