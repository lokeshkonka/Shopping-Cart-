document.addEventListener('DOMContentLoaded',()=>{
const Products =[
    {id:1,name:"Product 1",price:29},
    {id:2,name:"Product 2",price:22},
    {id:3,name:"Product 3",price:28},
];
const cart =[];


const productlist = document.getElementById('product-list');
const cartitems = document.getElementById('cart-items');
const emptycart = document.getElementById('empty-cart');
const carttotal = document.getElementById('cart-total');
const totalprice = document.getElementById('total price');
const checkoutbtn = document.querySelector(".checkbtn");


Products.forEach((p)=>{
const productdiv = document.createElement("div")
productdiv.classList.add("product")
productdiv.innerHTML = `
<span>${p.name} -- $${p.price} <div class="cart-btn-container"><button id="cart-btn" data-id="${p.id}">Add to Cart</button></div></span>`
productlist.appendChild(productdiv)
});
productlist.addEventListener('click',(e)=>{
if (e.target.tagName === 'BUTTON') {
    const pid=parseInt(e.target.getAttribute('data-id'))    
    const product = Products.find((p)=>p.id === pid)
     cart.push(product);
     rendercart()
    
     
}
cartitems.addEventListener('click', (e) => {
    if (e.target.id === 'cart-btn-delete') {
        const pid = parseInt(e.target.getAttribute('data-id')); // get the id
        const index = cart.findIndex(p => p.id === pid); // find the index of item in cart
        if (index !== -1) {
            cart.splice(index, 1); // remove the item at that index
            rendercart(); // update the cart UI
        }
    }
});

})


function rendercart() {
    let TTotalprice = 0;
    cartitems.textContent = ""; // clear the cart display first

    cart.forEach((item) => {
        TTotalprice += item.price;

        const cartitem = document.createElement('div');
        cartitem.innerHTML = `
            <span class="deletecart">
                ${item.name} -- $${item.price}
                <div class="cart-btn-container">
                    <button id="cart-btn-delete" data-id="${item.id}">delete</button>
                </div>
            </span>`;
        cartitems.appendChild(cartitem);
    });

    totalprice.textContent = `$${TTotalprice}`;

    if (cart.length) {
        emptycart.classList.add("hidden");
        carttotal.classList.remove("hidden");
    } else {
        cartitems.innerHTML = `<p id="empty-cart">Your cart is empty</p>`;
        carttotal.classList.add("hidden");
    }
}

checkoutbtn.addEventListener('click',()=>{
    cart.length = 0;
    if (cart.length == 0) {
        totalprice.textContent  =`$0`
    }
    alert("Checkout Successfully");
    rendercart()
})

});
