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


async function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    console.log("Product ID from URL:", productId);

    if (!productId) {
        console.warn("Pas d'ID de produit trouvé");
        return;
    }

    try {
        const response = await fetch('../data/data.json'); 
        console.log("Fetch response status:", response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const productsData = await response.json();
        console.log("Données chargées:", productsData);
        console.log("Cherche le produit:", productId);

        if (productsData[productId]) {
            const product = productsData[productId];
            console.log("Produit trouvé:", product);

            document.getElementById('product-brand').innerText = product.brand;
            document.getElementById('product-title').innerText = product.title;
            document.getElementById('product-price').innerText = product.price;
            document.getElementById('product-desc').innerText = product.description;

            document.getElementById('ProductImg').src = product.images[0];
            
            const smallImages = document.getElementsByClassName('small-img');
            
            for (let i = 0; i < smallImages.length; i++) {
                if (product.images[i + 1]) { 
                    smallImages[i].src = product.images[i + 1];
                }
            }
            
        } else {
            console.error("Produit non trouvé. IDs disponibles:", Object.keys(productsData));
            document.getElementById('product-title').innerText = "Produit introuvable";
        }
    } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
        document.getElementById('product-title').innerText = "Erreur de chargement";
    }
}

if (window.location.pathname.includes('product.html')) {
    loadProductDetails();
}      
    
