export default class ProductVariant {
  constructor(variantName, productObject) {
      this.variantName = variantName;
      this.size = 'md';

      const prodVariant = productObject.variants.find(dbProductVariant => variantName === dbProductVariant.variantName)
      if(!prodVariant) return
      this.pricing = prodVariant.pricing.priceGBP ? prodVariant.pricing : productObject.pricing
      this.inventory = prodVariant.inventory
      this.productID = productObject.nomenclature.productIDCode
      this.availableSizes = prodVariant.sizes
      this.imgSrcs = prodVariant.description.imgSources
  }

  handleVariantChange(variantName) {
    const prodVariant = productObject.variants.find(dbProductVariant => variantName === dbProductVariant.variantName)
    if(!prodVariant) return
    this.variantName = variantName;
    this.pricing = prodVariant.pricing.priceGBP ? prodVariant.pricing : productObject.pricing
    this.inventory = prodVariant.inventory
    this.imgSrcs = prodVariant.description.imgSources
    this.availableSizes = prodVariant.sizes
    this.handleSizeChange(this.size);
  }
  
  handleSizeChange(size) {
    if(!this.availableSizes.includes(this.size)) this.size = 'md'
    else this.size = size
  }
}