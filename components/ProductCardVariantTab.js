import { useContext } from 'react'

import { GlobalContext } from '../contexts/globalState'

function ProductCardVariantTab({ currentSettings, availableSettings }) {
  const { activeBasketItem, hoverBasketProductIndex, activeBasketProductIndex } = useContext(GlobalContext);
  const activeBasketItemData = activeBasketItem.basketItem.variants[hoverBasketProductIndex.variantIdx];
  const activeBasketProductDBData = activeBasketItem.dbItem;

  return (
    <div className="row row-cols-2  gy-2 align-items-center">
      <label className="col-3 text-end">Variant:</label>
      
      <div className="col-9">
        <button className="btn btn-outline-secondary dropdown-toggle w-100" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          {activeBasketItemData.variantName}
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          { activeBasketProductDBData.availableVariantNames.map((variantName, idx) => <li key={idx}><a className="dropdown-item">{variantName}</a></li>) }
        </ul>
      </div>
      
      <label className="col-3 text-end">Size:</label>
      
      <div className="col-9">
        <div className="dropdown">
          <button className="btn btn-outline-secondary dropdown-toggle w-100" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
          { activeBasketItemData.size }
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
            { activeBasketItemData.availableSizes.map((size, idx) => <li key={idx}><a className="dropdown-item">{size}</a></li>) }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProductCardVariantTab
