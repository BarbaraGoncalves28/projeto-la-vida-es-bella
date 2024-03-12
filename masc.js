if (document.readyState == "Loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}

let totalAmount = "0,00"

function ready() {

    const removeProductButtons = document.getElementsByClassName("remove-product-button")
console.log("removeProductButtons")

for (let i = 0; i < removeProductButtons.length; i++){
    removeProductButtons[i].addEventListener("click", removeProduct)
}


const quantityInputs = document.getElementsByClassName("product-qtd-input")
for (let i = 0; i < quantityInputs.length; i++) {
    quantityInputs[i].addEventListener("change", checkIfInputIsNull)
}


const addToCartButtons = document.getElementsByClassName("button-hover-background")
for (let i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener("click", addProductToCart)
}    
     
   const porchasseButton = document.getElementsByClassName("porchasse-button")[0]
   porchasseButton.addEventListener("click", makePurchase)

}

function makePurchase() {
    if (totalAmount == "0,00") {
        alert("Seu carrinho está vazio!")
    } else {
        alert(
            `
            Obrigado(a) pela sua compra!
            Valor do pedido: R$${totalAmount}
            Volte sempre! 😍
            `
        )
    }

    document.querySelector(".cart-table tbody").innerHTML = ""
    updateTotal()
}

function checkIfInputIsNull(event){
    if(event.target.value == "0") {
        event.target.parentElement.parentElement.remove()
    }

    updateTotal()

}


function addProductToCart(event) {
   const button = event.target
   const productInfos = button.parentElement.parentElement
   const productImage = productInfos.getElementsByClassName("product-image")[0].src
   const productTitle = productInfos.getElementsByClassName("product-title")[0].innerText
   const productPrice = productInfos.getElementsByClassName("product-price")[0].innerText

   const productsCartName = document.getElementsByClassName("cart-product-title")
   for (let i = 0; i < productsCartName.length; i++) {
    if (productsCartName[i].innerText == productTitle) {
        (productsCartName[i]).parentElement.parentElement.getElementsByClassName("product-qtd-input")[0].value++
        return
    }
   }

   let newCartProduct = document.createElement("tr")
   newCartProduct.classList.add("cart-product")

   newCartProduct.innerHTML = `
   
   <td class="product-identification">
      <img class="cart-product-image" src="${productImage}" alt="${productTitle}">
      <strong class="cart-product-title">${productTitle}</strong>
   </td>
   <td>
      <span class="cart-product-price">${productPrice}</span>
   </td>
   <td>
      <input class="product-qtd-input" type="number" value="1" min="0">
      <button class="remove-product-button" type="button">Remover</button>
   </td>
     
   `

   const tableBody = document.querySelector(".cart-table tbody")
   tableBody.append(newCartProduct)

   updateTotal()
   newCartProduct.getElementsByClassName("product-qtd-input")[0].addEventListener("change", checkIfInputIsNull)
   newCartProduct.getElementsByClassName("remove-product-button")[0].addEventListener("click", removeProduct)
}


function removeProduct(event) {
    event.target.parentElement.parentElement.remove()
    updateTotal()
}


function updateTotal() {
totalAmount = 0
const cartProducts = document.getElementsByClassName("cart-product")
for (let i = 0; i < cartProducts.length; i++){
    //console.log(cartProducts[i])
    const productPrice = cartProducts[i].getElementsByClassName("cart-product-price")[0].innerText.replace("R$", "").replace("," , ".")
    const productQuantity = cartProducts[i].getElementsByClassName("product-qtd-input")[0].value
    
    totalAmount += productPrice * productQuantity
}

totalAmount = totalAmount.toFixed(2)
totalAmount = totalAmount.replace("." , ",")
document.querySelector(".cart-total-container span").innerText = "R$" + totalAmount

}


