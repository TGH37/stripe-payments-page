export default class ProductVariant {
  constructor(name, productObject) {
      this.variantName = name;
      this.size = 'md';

      const prodVariant = productObject.variants.find(dbProductVariant => name === dbProductVariant.variantName)
      if(!prodVariant) return
      this.pricing = prodVariant.pricing.priceGBP ? prodVariant.pricing : productObject.pricing
      this.inventory = prodVariant.inventory
      this.productID = productObject.nomenclature.productIDCode
      this.availableSizes = prodVariant.sizes
  }
}