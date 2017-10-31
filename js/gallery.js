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
    };

    let onCart = [];


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
        productToRender.attr('id', 'product' + product.id);

        thumbnail = productToRender.find('img:first');
        thumbnail.attr("src", product.thumbnailUrl);

        title = productToRender.find('h3:first');
        title.text(product.title);

        addDataToProduct(product);

        productToRender.find('.btn:first').data('product', product);

        htmlElements.productContainer.append(productToRender);
    }
    
    function addDataToProduct(product) {
        product.cost = Math.round(Math.random() * 90000 + 10000);
        product.quantity = Math.round(Math.random() * 99 + 1);
    }
    
    function onAddToCartClick(element) {
        let product = $(element.currentTarget);
        onCart.push(product.data('product'));
        // localStorage.setItem('items');
    }

    /**
     * Se adquieren y pintan los productos.
     */
    getAllProductsByGroup(2)
        .then(function (products) {
            products.forEach(function (product) {
                paintProduct(product);
            });

            $('.btn').click(onAddToCartClick);
        });
});
