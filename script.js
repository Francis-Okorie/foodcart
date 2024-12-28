let container = document.getElementById("container");

let cartIcon = document.querySelector(".cart-icon");




fetch("food.json")
.then(response => {
    if(!response.ok){
        throw new Error ("Network not found")
    } return response.json();
})
.then((data) => {
    console.log(data);
    data.forEach(food => {
        console.log(food);
        let foodItem = document.createElement("div");
        let foodNameelement = document.createElement("h1");
        let foodImageelement = document.createElement("img");
        let buttonPrice = document.createElement("div");
        let foodDescription = document.createElement("p");
        let foodCurrcontent = document.createElement("div");
        let foodCurrency = document.createElement("h6");
        let foodPriceelement = document.createElement("h6");
        let buyButton = document.createElement("button");
        let foodName = food.name;
        let foodImage = food.image;
        let foodDes= food.description;
        let foodCurr = food.currency;
        let foodPrice = food.price;
        buyButton.textContent = "Order Now";
        buyButton.setAttribute("class", "btn-add2");
        buttonPrice.setAttribute("class", "btnprice");
        foodCurrcontent.setAttribute("class", "currency");
        foodNameelement.textContent=foodName
        foodImageelement.setAttribute("src", foodImage)
        foodImageelement.setAttribute("alt", "image")
        foodDescription.textContent=foodDes;
        foodCurrency.textContent=foodCurr;
        foodPriceelement.textContent= foodPrice;
        foodItem.appendChild(foodNameelement);
        foodItem.appendChild(foodImageelement);
        foodItem.appendChild(foodDescription);
        foodCurrcontent.appendChild(foodCurrency);
        foodCurrcontent.appendChild(foodPriceelement);
        buttonPrice.appendChild(foodCurrcontent);
        buttonPrice.appendChild(buyButton);
        container.appendChild(foodItem);
        foodItem.appendChild(buttonPrice);

        foodItem.className = "food-list";

        buyButton.addEventListener("click", ()=>{
            addTocart(foodPrice, foodImage, foodName)
        });




    });
})
.catch(error => console.error("There is an error", error));

cartIcon.addEventListener("click", ()=>{
    let dropDownmenu = document.querySelector(".drop-down")
    const visibility = dropDownmenu.getAttribute("data-visible");
    if (visibility === "false") {
        dropDownmenu.setAttribute("data-visible", true);
    } else {
        dropDownmenu.setAttribute("data-visible", false);
        
    }
    
});




function addTocart (price, image, name) {
    let item = {price: price, image: image, name: name};
   let cartItems = localStorage.getItem("cartitem");
 
   if(cartItems){
    let savedItem = JSON.parse(cartItems);
    let isExist = savedItem.some(items => items.price === item.price && items.name === item.name && items.image ===item.image);
    if(!isExist){
        savedItem.push(item);
        localStorage.setItem("cartitem", JSON.stringify(savedItem));
        updateSpanelement()
    }else {
        savedItem.push(item);
        localStorage.setItem("cartitem", JSON.stringify(savedItem));
        updateSpanelement()
    }
    
   } else{
    let savedItem = [];
    let isExist = savedItem.some(items => items.price === item.price && items.name === item.name && items.image ===item.image);
    isExist.quantity += 1;
    if(!isExist){
        savedItem.push(item);
        localStorage.setItem("cartitem", JSON.stringify(savedItem));
        updateSpanelement()
    }
    
   }

   updateCartContent()
   
   

}



function updateSpanelement() {
    let cartItems = JSON.parse(localStorage.getItem("cartitem"));
     if (cartItems){
     let numberOfcart = cartItems.length;
     console.log(numberOfcart);
     let spanElement = document.querySelector(".cartnum");
     spanElement.textContent = numberOfcart;
    
}
}

updateSpanelement()


function updateCartContent() {
    let saveCartItems =JSON.parse(localStorage.getItem("cartitem"));
    saveCartItems.forEach(item=>{
    let dropDown = document.querySelector(".drop-down");
    if(dropDown.hasChildNodes){
        dropDown.removeChild(document.getElementsByClassName("cartcontent"))
    }
    let cartContainer = document.createElement("div");
    cartContainer.setAttribute("class", "cartcontent");
    let foodImageelement = document.createElement("img");
    let foodNameelement = document.createElement("h1");
    let foodPriceelement = document.createElement("p");
    foodNameelement.textContent =item.name;
    foodImageelement.setAttribute("src", item.image);
    foodPriceelement.textContent = item.price;
    cartContainer.appendChild(foodImageelement);
    cartContainer.appendChild(foodNameelement);
    cartContainer.appendChild(foodPriceelement);
    dropDown.appendChild(cartContainer);
    function updateTotalprice (){
        let total = 0;
        saveCartItems.forEach(item=>{
         total+= parseInt(item.price);
        });
    
        let totalElement = document.querySelector(".totalvalue");
        totalElement.textContent = total;
    
        console.log(total);
        
    }

    updateTotalprice()
    
});
}

updateCartContent()
















 