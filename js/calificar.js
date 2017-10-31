window.onload = init;

var productId;
var btn_qualify;
var btn_show;
var error;
var product_qualify;
var storage;
var resultado;

var product = {};

//Metodo inicial
function init(){
    initVars();
    initEvents();
}

//Metodo para iniciar las variables
function initVars(){
    section_quialify = document.getElementById("section_quialify");
    productId = document.getElementById("productId");
    error = document.getElementById("error");
    product_qualify = document.getElementById("product_qualify");
    btn_qualify = document.getElementById("btn_qualify");
    btn_show = document.getElementById("btn_show");
    storage = [];
    resultado = [];
}

//metodo para iniciar eventos
function initEvents(){
    btn_qualify.addEventListener("click",qualify);
    btn_show.addEventListener("click", show);
}

//metodo que se encarga de agregar la calificación
function qualify(evt){
    
    product.id = productId.value;
    var qualify = parseInt(product_qualify.value);

    if(product.id == NaN || product.id == null || product.id == ""){
        error.innerText = "Debe de ingresar un id";
        return false;
    }
    if(qualify > 0 && qualify < 6 ){
        getFromStorage();
        product.amount++;
        product.qualify= parseInt(product.qualify)+parseInt(qualify);
        populateLocalStorage();
    }
    else{
        error.innerText = "La calificación es entre 1 y 5, ingrese una valida";
        return false;
    }
    
}

//metodo que se encarga de mostrar la calificación
function show(evt){
    product.id = productId.value;
    
    if(product.id == NaN || product.id == null || product.id == ""){
        error.innerText = "Debe de ingresar un id";
        return false;
    }
    getFromStorage();
    if(product.qualify != null && product.amount != null)
        product_qualify.value = product.qualify/ product.amount;
    else
        product_qualify.value = 0;

}
//agrega valores al localstorage
function populateLocalStorage(){
    localStorage.setItem("amount_" + product.id, product.amount);
    localStorage.setItem("qualify_" + product.id, product.qualify);
    
}

//obtiene vlaores del localstorage
function getFromStorage(){
    product.amount = localStorage.getItem("amount_" + product.id);
    product.qualify = localStorage.getItem("qualify_" + product.id);

    if(product.amount == null){
        product.amount = 0;
    }

    if(product.qualify == null){
        product.qualify = 0;
    }
}
// busca los productos por nombre dentro del local storage
function buscarProducto(){
    
    $("#btn_busqueda").click(function(){
        var txt_busqueda = $("#txt_busqueda").text;
        
        for (var i = 0; i < storage.length; i++) {
            if(storage[i].nombre.contains(txt_busqueda))
            {
                resultado.push(storage[i]);
            }
            
        }
    });

}



