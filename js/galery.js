/**
 * Inicialización de la app.
 */
$(document).ready(function () {

    /**
     * Ruta de la API.
     */
    let api = 'https://jsonplaceholder.typicode.com';

    /**
     * Elementos html usados en el código.
     */
    let htmlElements = {
        productContainer: $('#productContainer'),
        productTemplate: $('#productTemplate')
    }


    /**
     * Función para adquirir todos los productos de un grupo definido.
     * 
     * @param {number} groupId - Id del grupo de productos.
     * @returns Una promesa ajax para suscibirse.
     */
    function getAllProductsByGroup(groupId) {
        return $.ajax(api + '/photos?albumId=' + groupId);
    }

    /**
     * Función para renderizar un producto.
     * 
     * @param {Product} product 
     */
    function paintProduct(product) {
        let productToRender, thumbnail, title;

        productToRender = htmlElements.productTemplate.clone();
        productToRender.attr("id", "product" + product.id);

        thumbnail = productToRender.find('img:first');
        thumbnail.attr("src", product.thumbnailUrl);

        title = productToRender.find('h3:first');
        title.text(product.title);

        productToRender.data("product", product);

        htmlElements.productContainer.append(productToRender);
    }


    /**
     * Se adquieren y pintan los productos.
     */
    getAllProductsByGroup(2)
        .then(function (products) {
            products.forEach(function (product) {
                paintProduct(product);
            });
        });
});