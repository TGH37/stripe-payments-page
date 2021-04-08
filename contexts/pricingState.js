import { useContext, createContext, useState, useEffect, useRef } from 'react'
import { GlobalContext } from '../contexts/globalState'

const init = {

}
export const PricingContext = createContext(init)

export function PricingProvider({ children }) {
  const { basketProductsFullDBDataArry, sales, activeProductData, basketItemsArry } = useContext(GlobalContext);

  const extractLineItemsFromBasketProducts = () => {
    return basketItemsArry.flatMap(basketItem => {
      const uniqueVariants = [...new Set(basketItem.variants.map(basketVariant => basketVariant.variantName))];
      return uniqueVariants.map(uniqueVariantName => {
        const currentVariant = basketItem.variants.find(variant => variant.variantName === uniqueVariantName)
        const likeVariants = basketItem.variants.filter(basketVariant => basketVariant.variantName === uniqueVariantName)
        return {
          name: `${currentVariant.productID}_${currentVariant.variantName}`,
          amount: currentVariant.pricing.priceGBP * 100,
          quantity: likeVariants.length,
          currency: 'gbp'
        }
      })
    })
  }
  const [stripeLineItems, setStripeLineItems] = useState()
  // const stripeLineItemsRef = useRef(extractLineItemsFromBasketProducts());
  
  const updateStripeLineItems = () => setStripeLineItems(extractLineItemsFromBasketProducts());

  const getProduct = (productID, shouldReturnDbData=false) => {
    if(shouldReturnDbData) {
      return productID ? 
      basketProductsFullDBDataArry.find((dbProduct) => productID === dbProduct.nomenclature.productIDCode) :
      activeProductData.dbItem;

    } else {
      return productID ?
      basketItemsArry.find(product => product.productID === productID) :
      activeProductData.basketItem
    }
  }

  useEffect(() => {
    updateStripeLineItems();
  }, [basketItemsArry])
  
  
  useEffect(() => {
    setProductTotalPricingData(getProductTotalPricingData())
  }, [activeProductData])
  
  // returns an array of all discounts currently applied to each tag attributed to the selected product.
  const findTaggedSale = (productID=null) => {
    const product = getProduct(productID, true);
    if(!product) return 0
    
    const taggedDiscounts = product.tagArray.map(productTag => {
      const saleObj = sales.tagged.find(currentTag => currentTag.tagsAppliedTo.includes(productTag));
      return saleObj ? saleObj.discount_Percent : 0
    })
    return taggedDiscounts.length > 1 ? taggedDiscounts.reduce((currentMax, value) => value > currentMax ? value : currentMax) : taggedDiscounts[0];
  }

  const calculateHighestDiscountPercentage = (productID) => Math.max(sales.universal.discount_Percent, findTaggedSale(productID))

  const getProductTotalPricingData = (productID=null) => {
    const product = getProduct(productID);
    if(!product) return
    const getDiscountedPrice = (fullPrice, discount) => (fullPrice - fullPrice * discount / 100).toFixed(2)
    
    const priceArry = product.variants.map(variant => variant.pricing.priceGBP);
    const sum = priceArry.reduce((tot, curr) => tot += curr).toFixed(2);
    const avg = (sum / priceArry.length).toFixed(2);
    const discount = calculateHighestDiscountPercentage(productID);
    const priceArry_discounted = priceArry.map(fullPrice => getDiscountedPrice(fullPrice, discount));
    const sum_discounted = getDiscountedPrice(sum, discount);
    const avg_discounted = getDiscountedPrice(avg, discount);
    return {priceArry, sum, avg, discount, priceArry_discounted, sum_discounted, avg_discounted}
  }

  const [productTotalPricingData, setProductTotalPricingData] = useState(getProductTotalPricingData())
  
  return (
    <PricingContext.Provider value={
      {
        getProductTotalPricingData,
        productTotalPricingData,
        stripeLineItems,
        updateStripeLineItems,
        // stripeLineItemsRef,
      }
    }>
      {children}
    </PricingContext.Provider>
  )
}