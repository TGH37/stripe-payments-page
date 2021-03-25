import { useState, useContext, useEffect } from 'react'
import { GlobalContext } from './globalState'
import ProductVariant from '../classes/variant'

function useIncrement(count) {
    const {
      basketItemsArry, 
      setBasketItemsArry, 
      activeBasketItem,
      setActiveBasketProductIndex,
      updateActiveBasketItem,
    } = useContext(GlobalContext);

  const [variantArry, setVariantArry] = useState(activeBasketItem.variants)

  const newVariant = new ProductVariant('black-red', activeBasketItem.dbItem)

  const basketProduct = basketItemsArry.find(basketItem => basketItem.productID === newVariant.productID);
  const productIdx = basketItemsArry.indexOf(basketProduct)

  activeBasketItem.basketItem.variants.length

  
  useEffect(() => {
    setVariantArry([...basketProduct.variants, newVariant])
  }, [])
  
  useEffect(() => {
    const newProduct = Object.assign({}, basketProduct)
    newProduct.variants = variantArry
    setBasketItemsArry(prev => {
      let returnArry = [...prev]
      returnArry[productIdx] = newProduct
      return returnArry
    })
  },[variantArry])


  useEffect(() => {
    setActiveBasketProductIndex({productIdx, variantIdx: basketProduct.variants.length})
    updateActiveBasketItem();
  }, [basketItemsArry])

  return (
    {newVariant}
  )
}

export default useIncrement
