import { useContext } from 'react'
import { GlobalContext } from '../contexts/globalState'

// TODO: Make this into a separate context, so you only need to call the hook once

function useDiscount(productID=null) {
  const { basketProductsFullDBDataArry, sales, activeProductData, hoverBasketProductIndex, basketItemsArry } = useContext(GlobalContext);
  if(!productID) productID = activeProductData.basketItem.productID;

  const sumVariantPrices = (productID=null) => {
    const product = productID ? 
    basketItemsArry.find(product => product.productID === productID) :
    activeProductData.basketItem
    const prices = product.variants.map((variant) => variant.pricing.priceGBP)
    return prices.reduce((tot, curr) => tot += curr);
  };
  
  // returns an array of all discounts currently applied to each tag attributed to the selected product.
  const findTaggedSale = (productID) => {
    const allDiscounts = basketProductsFullDBDataArry.flatMap( product => {
      if(productID !== product.nomenclature.productIDCode) return
        return product.tagArray.flatMap(productTag => {
          const taggedSale = sales.tagged.find(currentTag => currentTag.tagsAppliedTo.includes(productTag));
          return taggedSale ? taggedSale.discount_Percent : []
        });
      })
      return allDiscounts.length !== 1 ? allDiscounts.reduce((currentMax, value) => value > currentMax ? value : currentMax) : allDiscounts[0];
  }
  
  // returns the highest discounted amount (percentage), accounting for global sale codes and sale codes applied specifically to the selected product
  const calculateHighestDiscountPercentage = (productID) => Math.max(sales.universal.discount_Percent, findTaggedSale(productID))

  const currentBasketVariantData = activeProductData.basketItem.variants[hoverBasketProductIndex.variantIdx];

  // TODO: Make maxDiscount Statefull, to apply certain discount codes
  const maxDiscount = calculateHighestDiscountPercentage(currentBasketVariantData.productID)
  const fullVariantPrice = currentBasketVariantData.pricing.priceGBP.toFixed(2)
  const discountedVariantPrice = (currentBasketVariantData.pricing.priceGBP - (currentBasketVariantData.pricing.priceGBP * ( maxDiscount / 100))).toFixed(2);
  const totalPrice = sumVariantPrices().toFixed(2);
  const discountedTotalPrice = (sumVariantPrices() - (sumVariantPrices() * ( maxDiscount / 100))).toFixed(2);
  const averagePrice = (discountedTotalPrice / activeProductData.basketItem.variants.length).toFixed(2);

  // all variant prices? return arry with all variant prices (full & discounted)
  return {
    maxDiscount,
    fullVariantPrice,
    discountedVariantPrice,
    totalPrice,
    discountedTotalPrice,
    averagePrice,
  }
}

export default useDiscount
