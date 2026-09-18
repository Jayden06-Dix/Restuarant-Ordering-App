import {menuArray} from '/data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

let order = []

document.addEventListener('click', function(e){
    // add btn 
    if(e.target.classList.contains('add-btn')){
        incrementAddBtn(e.target.dataset.id)
    } 
    // decrease btn
    else if(e.target.classList.contains('decrease-btn')){
        decrementAddBtn(e.target.dataset.id)
    }
    // remove btn  
    else if(e.target.classList.contains('remove-btn')){
        removeBtn(e.target.dataset.id)
    }
    // order btn
    else if(e.target.classList.contains('order-btn')){
        orderBtn()
    } 
    // modal close
    else if(e.target.id === 'modal-container'){
        document.getElementById('modal-container').style.display = 'none'
    }

})

    // modal pay btn 
    document.addEventListener('submit', function(e){
        if(e.target.matches('#modal-container form')){
            e.preventDefault()
            payBtn(e.target)
        }
    })

    // Button Functions

function incrementAddBtn(btnId){
    const targetMenuItem = menuArray.filter(function(item){
        return item.id === Number(btnId)
    })[0]
    
    targetMenuItem.quantity++
    
    if(!order.includes(targetMenuItem)){
        order.push(targetMenuItem)
    }
    
    renderCheckout()
}

function decrementAddBtn(btnId){
    const targetMenuItem = menuArray.filter(function(item){
        return item.id === Number(btnId)
    })[0]
    
    if(targetMenuItem.quantity > 1){
        targetMenuItem.quantity--
    } else {
        order = order.filter(function(item){
            return item.id !== Number(btnId)
        })
        targetMenuItem.quantity = 0
    }
    
    renderCheckout()  
}

function removeBtn(btnId){
    order = order.filter(function(item){
      return item.id !== Number(btnId)  
    })
    
    renderCheckout()
}

function orderBtn(btnId){
    renderModal()
    const modal = document.getElementById('modal-container')
    modal.style.display = 'flex'
}

 function payBtn(form){
    const name = form.querySelector('.username').value.trim()
    document.getElementById('modal-container').style.display = 'none'
    document.getElementById('modal-container').innerHTML = ''
    document.getElementById('checkout').innerHTML = ''
    
    order.forEach(item => item.quantity = 0)
    order = []
    
    renderMessage(name)
} 

    // Gettting and returning HTML 
    
function getMenuHtml() {
    let menu = ``
    
    menuArray.forEach(function(item){
        menu += `
                <div class="menu-items">
                    <span class="item-emoji">${item.emoji}</span>
                    <div class="item-info">
                        <h2 class="item-title">${item.name}</h2>
                        <p class="item-description">${item.ingredients}</p>
                        <p class="item-price">$${item.price}</p>
                    </div>
                    <div class="buttons">
                    <button class="add-btn" data-id="${item.id}">+</button>
                    <button class="decrease-btn" data-id="${item.id}">-</button>
                    </div>
                </div>
                <hr>
                `     
    })
    return menu
} 

function getOrderTotal() {

    let total = 0

    order.forEach(function(item) {
        total += item.price * item.quantity
    })

    return total
}

function getOrderHtml() {
    let orderHtml = `
                        <div class="order">
                            <h3 class="order-title">Your Order</h3>
                    `
    
    order.forEach(function(item){
        orderHtml += `
                            <div class="checkout-items">
                                <div class="checkout-items-left">
                                    <span>${item.quantity}x</span>
                                    <span class="checkout-item-name">${item.name}</span>
                                    <button class="remove-btn" data-id="${item.id}">
                                        remove
                                    </button>  
                                </div>
                                <div class="checkout-items-right">
                                    <span class="checkout-item-price">$${item.price * item.quantity}</span>
                                </div>
                            </div>
                    `
        })
         
         orderHtml +=    `                   
                            <hr class="divider">
                            <div class="total-price">
                                <p class="total-price-text">Total Price:</p>
                                <span class="total-price-price">$${getOrderTotal()}</span>
                            </div>
                            <button class="order-btn">Complete Order</button>
                        </div>
                        `
    
    return orderHtml
}

function getModalHtml(){
    return  `
                <div class="modal">
                    <h1 class="modal-heading">Enter card details</h1>
                    <form>
                        <input  type="text" 
                                class="username" 
                                name="username" 
                                placeholder="Enter Your Name" 
                                required>
                                
                        <input  type="text" 
                                class="card-number" 
                                name="card-number" 
                                placeholder="Enter Card Number" 
                                required>
                                
                        <input  type="text" 
                                class="user-cvv" 
                                name="user-cvv" 
                                placeholder="Enter CVV" 
                                required>
                                
                        <button type="submit" class="pay-btn">Pay</button>
                    </form>
                </div>
            `
}

    // Render Functions

function render(){
    document.getElementById('menu-item').innerHTML = getMenuHtml()
}

function renderCheckout(){
    document.getElementById('checkout').innerHTML = getOrderHtml() 
}

function renderModal(){
    document.getElementById('modal-container').innerHTML = getModalHtml()
}

function renderMessage(name) {
    const container = document.getElementById('thank-you-container')
    container.innerHTML = `<p class="thank-you-message">Thanks, <span class="user-name"></span>! Your order is on its way!</p>`
    container.querySelector('.user-name').textContent = name
    container.style.display = 'flex'
}

render()