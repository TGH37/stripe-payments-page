import { useContext } from 'react'

import BasketRow from './BasketRow'
import {GlobalContext} from '../contexts/globalState'



function BasketTable() {
  const { basketProductsFullDBDataArry, basketItemsArry } = useContext(GlobalContext)

  const basketProductComponentRows = basketItemsArry.map((basketItem, idx) => {
    const fullProductDBData = basketProductsFullDBDataArry.find(basketProduct => basketItem.productID === basketProduct.nomenclature.productIDCode);
    if(!fullProductDBData) return

    return <BasketRow 
              key={idx} 
              idx={idx} 
              name={fullProductDBData.nomenclature.productName} 
              localePrice={0} 
              variants={basketItem.variants}
              productID={fullProductDBData.nomenclature.productIDCode}
            />;

  })

  return (
    <table className="table table-striped table-hover text-capitalize text-center">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">#</th>
          <th scope="col">Item</th>
          <th scope="col">Price</th>
          <th scope="col">Qty</th>
          <th scope="col">Total</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody style={{position: "relative"}}>
        { basketProductComponentRows }
      </tbody>
    </table>
  )
}

export default BasketTable
