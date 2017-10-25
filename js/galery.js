$(document).ready(function () {

    let root = 'https://jsonplaceholder.typicode.com';
    let products;

    let htmlElements = {
        productContainer: $('#productContainer')
    }

    /**
     * Función para adquirir todos los elementos de un tipo de producto definido.
     * 
     * @param {string} productType - Tipo de productos que se pedirán.
     * @returns Una promesa ajax para suscibirse
     */
    function getAllProductsByType(productType) {
        return $.ajax({
            url: root + '/' + productType,
            method: 'GET'
        });
    }

    getAllProductsByType("todos")
        .then(function (data) {
            products = data;
            
        });

});