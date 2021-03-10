const cardQuantity = document.querySelector("#cardQuantity");
const cardIncrementButton = document.querySelector("#cardIncBtn");
const cardDecrementButton = document.querySelector("#cardDecBtn");


const basketProducts = document.getElementsByClassName("basket-product");





let activeProduct = basketProducts[0];

cardIncrementButton.addEventListener('click', () => {
  cardQuantity.innerHTML = parseInt(cardQuantity.innerHTML) + 1;
})
cardDecrementButton.addEventListener('click', () => {
  if(parseInt(cardQuantity.innerHTML) > 0) cardQuantity.innerHTML = parseInt(cardQuantity.innerHTML) - 1;
})

const increment = (element) => {
  const elementValue = element.value.toInt();
  elementValue += 1;
  element.innerHTML = elementValue;
}

