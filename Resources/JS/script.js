var cart = [];
var qtySelected = false;

//product object
function Product(quantity, flavor2, flavor3, price, index) {
    this.quantity = quantity;
    this.flavor2 = flavor2;
    this.flavor3 = flavor3;
    this.price = price;
    this.index = index;
};

$(document).ready(function(){
    var list = JSON.parse(localStorage.getItem("storagepasscode"))
    if (list === null) {
        list = [];
        var counter = 0;
        $("#textshoppingcart").text("Shopping Cart ("+list.length+")");
    } else{
        var counter = list.length;
         $("#textshoppingcart").text("Shopping Cart ("+list.length+")");
    }
       
    var quantity = "bunquantity";
    var price = "0";
    
    $("#amountChoice1").click(function(ev){
        quantity = "1 Bun";
        price = "$2.95";
        console.log("click!" + quantity + price);
        var selection1 = document.getElementById("bun-select1")
        var selection2 = document.getElementById("bun-select2")
        console.log("one bun selected");
        selection1.style.display = 'none';
        selection2.style.display = 'none';
        qtySelected = true;
    })

    $("#amountChoice2").click(function(ev){
        quantity = "6 pack";
        price = "$15";
        console.log("click!" + quantity + price);
        var selection1 = document.getElementById("bun-select1")
        var selection2 = document.getElementById("bun-select2")
        selection1.style.display = 'block';
        selection2.style.display = 'block';
        qtySelected = true;
    })
    
    $("#amountChoice3").click(function(ev){
        quantity = "12 pack";
        price = "$25";
        console.log("click!" + quantity + price);
        var selection1 = document.getElementById("bun-select1")
        var selection2 = document.getElementById("bun-select2")
        selection1.style.display = 'block';
        selection2.style.display = 'block';
        qtySelected = true;
    })

//Code for dynamic text and image to reflect user's purchasing choices below
    
    $("#amountChoice1").click(function(ev){
        $("#descriptionPrice").text("Price = $2.95")
        $("#singlebunimage").attr("src","../Images/mapleapplepecan.jpg")
    })
    
    $("#amountChoice2").click(function(ev){
        $("#descriptionPrice").text("Price = $15")
        $("#singlebunimage").attr("src","../Images/pack6.png")
    });
    
    $("#amountChoice3").click(function(ev){
        $("#descriptionPrice").text("Price = $25")
       $("#singlebunimage").attr("src","../Images/pack12.png")
    })

//code for dropdown flavor menu choice selection below 
    
    var flavor2 = "No Additional Flavor";
    
    $("#bun-select1").change(function(ev){
       flavor2 = $("#bun-select1").val();
        console.log("click!", flavor2);
    })
    var flavor3 = "No Additional Flavor";
    $("#bun-select2").change(function(ev){
        flavor3 = $("#bun-select2").val();
        console.log("click!", flavor3);
    })
//    
//local storage set up below 

    $("#button").click(function(ev){
        if (qtySelected == true) {
            var bun = new Product(quantity, flavor2, flavor3, price, index);
            list.push(bun);
            counter = counter + 1;
            var jsonlist = JSON.stringify(list);
            localStorage.setItem("storagepasscode", jsonlist);
            console.log("click!");
            $("#textshoppingcart").text("Shopping Cart ("+list.length+")");
        }
    })
    
    var hasSavedBun = false;
    if(list == []) {
        $("#morespace").text("No items in cart");
    } else {
        for (i=0; i < list.length; i++) {
            var index = i;
            $("#numitems1").append("<p class='qty'>" + list[i].quantity + "</p>");
             $("#flavors1").append("<p class='fla'>" + "Maple Apple, " + list[i].flavor2 + ", " + list[i].flavor3 + "</p>");
             $("#price1").append("<p class='pri'>" + list[i].price + "</p>");
            $("#delete").append("<p data-value ='" + i   +"' class='del'>" + "X" + "</p>");
        }
    }
    $(".del").click(function(ev){
        var listTemp = list;
        removeIndex = $(this).data("value");
        removeHTML = removeIndex+2;
        console.log($(this).data("value"));
        console.log(removeHTML);
        listTemp.splice(removeIndex,1);
        var jsonlist = JSON.stringify(listTemp);
        localStorage.setItem("storagepasscode", jsonlist);
        $("div#numitems1 p:nth-child("+removeHTML+")").remove();
        $("div#flavors1 p:nth-child("+removeHTML+")").remove();
        $("div#price1 p:nth-child("+removeHTML+")").remove();
        $("div#delete p:nth-child("+removeHTML+")").remove();
        $("#textshoppingcart").text("Shopping Cart ("+list.length+")");
    });
    
});