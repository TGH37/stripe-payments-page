import { createContext, useEffect, useState, useRef } from 'react'

import siteVars from '../database/siteVars.json'
import productsDB from '../database/products.json'
import user from '../database/testUser.json'
import ProductVariant from '../classes/variant'

// filter all database products to those contained in user basket (functionality should be replaced server-side)
// modify user basket variants data to include more contextual information from db
const getFilteredDatabaseProducts = () => { 
  return user.basket.flatMap( basketProduct => getProductFullData(basketProduct) ? getProductFullData(basketProduct) : []);
}

// returns the full dataset from the database, for the selected product in the user's basket
const getProductFullData = (basketProduct) => Object.values(productsDB).find( dbProduct => dbProduct.nomenclature.productIDCode === basketProduct.productID ? dbProduct : null);

// returns the database data for all permitted variants of the current product
const getDatabaseVariantData = (dbProduct, basketVariant) => dbProduct.variants.find(dbVariant => basketVariant.variantName === dbVariant.variantName)

// modifies the each product in the user's basket, appending relevant information to each variant of the product in the basket,
// returning the modified basket items.
const getBasketItemsData = () => {
  return user.basket.flatMap( basketProduct => {
    const dbProduct = getProductFullData(basketProduct)
    if(!dbProduct) return [];
    const alteredBasketItemVariants = basketProduct.variants.flatMap(basketVariant => {
      const prodVariant = getDatabaseVariantData(dbProduct, basketVariant)
      return new ProductVariant(prodVariant.variantName, dbProduct)
    });
    return {...basketProduct, variants: alteredBasketItemVariants};
  });
}



const initialState = {
  ...siteVars,
  activeBasketProductIndex: {productIdx: 0, variantIdx: 0},
  hoverBasketProductIndex: {productIdx: 0, variantIdx: 0},
  basketProductsFullDBDataArry: getFilteredDatabaseProducts(),
  basketItemsArry: getBasketItemsData(),
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  // Action Functions
  const [hoverBasketProductIndex, setHoverBasketProductIndex] = useState(initialState.hoverBasketProductIndex);
  const [activeBasketProductIndex, setActiveBasketProductIndex] = useState(initialState.activeBasketProductIndex);
  const [activeDatabaseProduct, setActiveDatabaseProduct] = useState(initialState.basketProductsFullDBDataArry[initialState.activeBasketProductIndex.productIdx]);
  const [basketItemsArry, setBasketItemsArry] = useState(initialState.basketItemsArry);

  const [activeProductData, setActiveProductData] = useState({
    dbItem: initialState.basketProductsFullDBDataArry[initialState.activeBasketProductIndex.productIdx],
    basketItem: initialState.basketItemsArry[initialState.activeBasketProductIndex.productIdx]
  });

  // Updates the items in the user's basket
  const addVariant = async (newVariant=null) => {
    if(!newVariant) newVariant = new ProductVariant('black-red', activeProductData.dbItem)
    const basketProduct = basketItemsArry.find(basketItem => basketItem.productID === newVariant.productID);
    const productIdx = basketItemsArry.indexOf(basketProduct)

    // Copy previous basket items array and add in new variant
    const newProduct = Object.assign({}, basketProduct)
    newProduct.variants = [...basketProduct.variants, newVariant]

    await setBasketItemsArry(prev => {
      let returnArry = [...prev]
      returnArry[productIdx] = newProduct
      return returnArry
    })

    setActiveBasketProductIndex({productIdx, variantIdx: basketProduct.variants.length - 1})
    setActiveProductData(
      {
        dbItem: initialState.basketProductsFullDBDataArry[initialState.activeBasketProductIndex.productIdx],
        basketItem: basketItemsArry[activeBasketProductIndex.productIdx]
      }
    )
  }


  // Updates the items in the user's basket
  const removeVariant = (productIdx) => {
    const basketProduct = basketItemsArry[productIdx.productIdx];
    if(basketProduct.variants.length === 1) return
    
    // if the currently selected item is the last item in the variant arry, update the active and hover items to be the penultimate item
    if(productIdx.variantIdx === basketProduct.variants.length - 1) {
      setActiveBasketProductIndex({productIdx: productIdx.productIdx, variantIdx: basketProduct.variants.length - 2})
      setHoverBasketProductIndex({productIdx: productIdx.productIdx, variantIdx: basketProduct.variants.length - 2})
    }
    // Copy previous basket items array and add in new variant
    const newProduct = Object.assign({}, basketProduct)
    const newVariantArry = newProduct.variants.filter((variant, idx) => idx !== productIdx.variantIdx)

    setBasketItemsArry(prev => {
      let returnArry = [...prev]
      returnArry[productIdx.productIdx].variants = newVariantArry
      return returnArry
    })

    updateActiveBasketItem()
    
  }

  // returns the basket item data and the full product dataset from the databse, for the active item
  const updateActiveBasketItem = () => {
    setActiveProductData(
      {
        dbItem: initialState.basketProductsFullDBDataArry[initialState.activeBasketProductIndex.productIdx],
        basketItem: basketItemsArry[activeBasketProductIndex.productIdx]
      }
    )
  }

  return (
    <GlobalContext.Provider value={
      {
        hoverBasketProductIndex, setHoverBasketProductIndex,
        activeBasketProductIndex, setActiveBasketProductIndex,
        
        activeDatabaseProduct,
        activeProductData,
        
        basketProductsFullDBDataArry: initialState.basketProductsFullDBDataArry,
        basketItemsArry, setBasketItemsArry,
        
        sales: initialState.saleCodes,
        addVariant,
        removeVariant,
        updateActiveBasketItem,
      }
    }>
      {children}
    </GlobalContext.Provider>
  )
}


