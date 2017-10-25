$(document).ready(function () {

    let root = 'https://jsonplaceholder.typicode.com';
    let products = [];

    let htmlElements = {
        productContainer: $('#productContainer'),
        productTemplate: $('#productTemplate')
    }

    /**
     * Función para adquirir todos los elementos de un tipo de producto definido.
     * 
     * @param {string} productType - Tipo de productos que se pedirán.
     * @returns Una promesa ajax para suscibirse
     */
    function getAllProductsByType(productType) {
        return $.ajax({
            url: root + '/' + productType + "?albumId=1",
            method: 'GET'
        });
    }

    getAllProductsByType("photos")
        .then(function (products) {
            products.forEach(function (product) {
                paintProduct(product);
            });
        });

    function paintProduct(product) {
        let productToRender, thumbnail, title;

        productToRender = htmlElements.productTemplate.clone();
        productToRender.attr("id", "product" + product.id);

        thumbnail = productToRender.find('img:first');
        thumbnail.attr("src", product.thumbnailUrl);

        title = productToRender.find('h3:first');
        title.text(product.title);

        htmlElements.productContainer.append(productToRender);
    }

});