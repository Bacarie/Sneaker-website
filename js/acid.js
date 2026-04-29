if(document.readyState == "loading"){
    document.addEventListener('DOMContentLoaded', ready);
}else{
    ready();
}



function ready(){

var Enlever = document.getElementsByClassName("Enlever");


for(var i=0; i < Enlever.length; i++){
    var button = Enlever[i];
    button.addEventListener('click', removeCartItem);
        
    }

var quantityInputs = document.getElementsByClassName('amount');
for (var i=0 ; i < quantityInputs.length ; i++){
    var input = quantityInputs[i];

    input.addEventListener('change',quantityChanged);
}



}



function removeCartItem (event) { 
    var buttonClicked = event.target;
    

    buttonClicked.parentElement.parentElement.parentElement.parentElement.remove();
    updateCardTotal();

}

function quantityChanged(event){
    var input = event.target
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }

    updateCardTotal();
}

function updateCardTotal(){
    var Item = document.getElementsByClassName("table")[0];
    var Lignes = Item.getElementsByClassName("item-row");

    var total = 0;
    

   for( var i = 0; i<Lignes.length; i++){

    var Ligne = Lignes[i];
   
    var Infos = Ligne.children[0].children[0].children[1];
    var Price = Infos.getElementsByTagName("small")[0];

    var Quantite = Ligne.children[1].children[0];

    var price = parseFloat(Price.innerText.replace(/[^0-9]/g,''));
    var quantite = Quantite.value;

    total = total + (price*quantite);

   } 

   total = Math.round(total * 100)/100

   document.getElementsByClassName("total-price")[0].children[0].children[0].children[0].children[1].innerText = total + '€'; 
}


var menuList = document.getElementById("menuList");

menuList.style.maxHeight = "0px";

function togglemenu(){
    if (menuList.style.maxHeight == "0px"){
        menuList.style.maxHeight = "130px";
    } else {
        menuList.style.maxHeight = "0px"
    }
}

var LoginForm= document.getElementById("LoginForm");
        var RegForm= document.getElementById("RegForm");
        var loginSpan = document.getElementById("loginSpan");
        var registerSpan = document.getElementById("registerSpan");
        
    
        function register(){
            RegForm.style.transform = "translateX(0px)";
            LoginForm.style.transform = "translateX(0px)";
            registerSpan.style.color = "#B50000";
            loginSpan.style.color = "black";

        }
    
        function login(){
            RegForm.style.transform = "translateX(300px)";
            LoginForm.style.transform = "translateX(300px)";
            
            loginSpan.style.color = "#B50000";
            registerSpan.style.color = "black";

        }
    
