function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


$(".add-to-cart").click(function(event){
  event.preventDefault();
  var name = $(this).attr("data-name");
  var price = Number($(this).attr("data-price"));

  shoppingCart.addItemToCart(name, price, 1);
  displayCart();
});

$("#clear-cart").click(function(event){
  shoppingCart.clearCart();
  displayCart();
});

function displayCart() {
  var cartArray = shoppingCart.listCart();
  console.log(cartArray);
  var output = "";

  for (var i in cartArray) {
      output += "<li>"
          +cartArray[i].name
          +" <input class='item-count' type='number' data-name='"
          +cartArray[i].name
          +"' value='"+cartArray[i].count+"' >"
          +" x "+cartArray[i].price
          +" = "+cartArray[i].total
          +" <button class='plus-item' data-name='"
          +cartArray[i].name+"'>+</button>"
          +" <button class='subtract-item' data-name='"
          +cartArray[i].name+"'>-</button>"
          +" <button class='delete-item' data-name='"
          +cartArray[i].name+"'>X</button>"
          +"</li>";
  }

  $("#show-cart").html(output);
  $("#count-cart").html( shoppingCart.countCart() );
  $("#total-cart").html( shoppingCart.totalCart() );
}

$("#show-cart").on("click", ".delete-item", function(event){
  var name = $(this).attr("data-name");
  shoppingCart.removeItemFromCartAll(name);
  displayCart();
});

$("#show-cart").on("click", ".subtract-item", function(event){
  var name = $(this).attr("data-name");
  shoppingCart.removeItemFromCart(name);
  displayCart();
});

$("#show-cart").on("click", ".plus-item", function(event){
  var name = $(this).attr("data-name");
  shoppingCart.addItemToCart(name, 0, 1);
  displayCart();
});

$("#show-cart").on("change", ".item-count", function(event){
  var name = $(this).attr("data-name");
  var count = Number($(this).val());
  shoppingCart.setCountForItem(name, count);
  displayCart();
});


displayCart();


var shoppingCart = (function () {
// Private methods and properties
var cart = [];

function Item(name, price, count) {
  this.name = name
  this.price = price
  this.count = count
}

function saveCart() {
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

function loadCart() {
  cart = JSON.parse(localStorage.getItem("shoppingCart"));
  if (cart === null) {
      cart = []
  }
}

loadCart();



// Public methods and properties
var obj = {};

obj.addItemToCart = function (name, price, count) {
  for (var i in cart) {
      if (cart[i].name === name) {
          cart[i].count += count;
          saveCart();
          return;
      }
  }

  console.log("addItemToCart:", name, price, count);

  var item = new Item(name, price, count);
  cart.push(item);
  saveCart();
};

obj.setCountForItem = function (name, count) {
  for (var i in cart) {
      if (cart[i].name === name) {
          cart[i].count = count;
          break;
      }
  }
  saveCart();
};


obj.removeItemFromCart = function (name) { // Removes one item
  for (var i in cart) {
      if (cart[i].name === name) { // "3" === 3 false
          cart[i].count--; // cart[i].count --
          if (cart[i].count === 0) {
              cart.splice(i, 1);
          }
          break;
      }
  }
  saveCart();
};


obj.removeItemFromCartAll = function (name) { // removes all item name
  for (var i in cart) {
      if (cart[i].name === name) {
          cart.splice(i, 1);
          break;
      }
  }
  saveCart();
};


obj.clearCart = function () {
  cart = [];
  saveCart();
}


obj.countCart = function () { // -> return total count
  var totalCount = 0;
  for (var i in cart) {
      totalCount += cart[i].count;
  }

  return totalCount;
};

obj.totalCart = function () { // -> return total cost
  var totalCost = 0;
  for (var i in cart) {
      totalCost += cart[i].price * cart[i].count;
  }
  return totalCost.toFixed(2);
};

obj.listCart = function () { // -> array of Items
  var cartCopy = [];
  console.log("Listing cart");
  console.log(cart);
  for (var i in cart) {
      console.log(i);
      var item = cart[i];
      var itemCopy = {};
      for (var p in item) {
          itemCopy[p] = item[p];
      }
      itemCopy.total = (item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy);
  }
  return cartCopy;
};

// ----------------------------
return obj;
})();

function myFunction() {
document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
if (!event.target.matches('.dropbtn')) {
var dropdowns = document.getElementsByClassName("dropdown-content");
var i;
for (i = 0; i < dropdowns.length; i++) {
  var openDropdown = dropdowns[i];
  if (openDropdown.classList.contains('show')) {
    openDropdown.classList.remove('show');
  }
}
}
}



