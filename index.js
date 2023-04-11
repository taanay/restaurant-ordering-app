import { menuArray } from "./data.js"

let subCheckout =``
let total = 0
const orderArray = []

document.addEventListener('click', function(e) {
    if(Number(e.target.dataset.add)>=0) {
        handleAddClick(Number(e.target.dataset.add))
    }
    if(e.target.dataset.val >= 0) {
        removeOrder(e.target.dataset.val)
        // console.log(e.target.dataset.val)
    }
    // if(e.target.id == "complete-btn") {
    //     console.log("completed")
    // }
})

function removeOrder(index) {
    
    total = total - orderArray[index].price
    // console.log(total)       
    orderArray.splice(index, 1)
    
    renderOrder()
    
}


/* when add button is clicked for multiple items the html is added to the list */
function handleAddClick(elementId) {
    // console.log(elementId)
    const targetMenuObj = menuArray.filter(function(menu) {
        return menu.id === elementId
    })[0]
    

    orderArray.push(targetMenuObj)

    total += targetMenuObj.price
    // console.log(total)

    renderOrder()
}


function renderOrder() {

    orderArray.forEach(function(order, index) {
            subCheckout += 
            `
            <div id="checkout-flex" class="checkout-flex">
                    <h2 id="checkout-item" class="checkout-item">${order.name}</h2>
                    <p id="remove" class="remove" data-val = ${index} >remove</p>
                    <h3 id="order-price">$${order.price}</h3>
            </div>
            `
            
    })
    
    handleAddClickRender(subCheckout, total)
    subCheckout = ``

}


/* render when the add button is clicked without affecting the "total price" and "complete order btn"  */

function handleAddClickRender(subCheckout, total) {
        let checkoutContent = ``
        checkoutContent = `
            <section id="checkout-block" class="checkout-block">
                <h2 id="checkout-head" class="checkout-head">Your order</h2>
                ${subCheckout}
                <div id="border" class="border"></div>
                <div id="checkout-total" class="checkout-total">
                    <h2 id="total-tag" class="total-tag">Total price:</h2>
                    <div id="empty"></div>
                    <h3 id="total-count">$${total}</h3>
                </div>
                <button id="complete-btn" class="complete-btn">Complete order</button>
            </section>`
            
    document.getElementById('checkout-wrapper').innerHTML = checkoutContent
    

}



// render all the menu items 

function getItemsHtml() {
    let itemsHtml = ``

    menuArray.forEach(function(item) {


        let ingredientsInItem = ``

        item.ingredients.forEach(function(ingredient) {
            ingredientsInItem += `${ingredient}, `
            // console.log(ingredientsInItem)
        })

        itemsHtml += `
        <div id="container" class="container">
            <img id="item" class="item" src=${item.emoji}>
                <section id="details" class="details">
                    <h2 id="item-name">${item.name}</h2>
                    <p id="item-types" class="item-types" id="item-types">${ingredientsInItem}</p>
                    <h3 id="item-price">$${item.price}</h3>
                </section>
            <img class="add-img" id="add-img" src="/images/add-btn.png" alt="click button to add item to cart" data-add="${item.id}">
        </div>
        `
    }) 
    
    return itemsHtml
}

function render() {
    document.getElementById("feed").innerHTML = getItemsHtml()
}

render()





            