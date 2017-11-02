window.onload = function () {
    console.log("ONLOAD");
    var cart = new Cart();
    var copy = JSON.parse(localStorage.getItem("items"));
    if (copy != null)
        localStorage.setItem("copy", copy);
};
/**
 * Clase que representa un artículo de la tienda.
 */
var Item = /** @class */ (function () {
    function Item() {
    }
    return Item;
}());
/**
 * Clase que representa el carrito de compras.
 */
var Cart = /** @class */ (function () {
    /**
     * Constructor de la clase
     */
    function Cart() {
        this.item1 = {
            id: "123",
            image: "img/producto1.png",
            name: "pc",
            cost: 666666,
            quantity: 6
        };
        this.item2 = {
            id: "456",
            image: "img/producto1.png",
            name: "pc2",
            cost: 666666,
            quantity: 6
        };
        /**
         * Contenedora de los artículos que han sido seleccionados por un usuario.
         */
        this.items = new Array;
        /**
         * Contenedora de los códigos de descuento válidos;
         */
        this.codigos = new Array;
        var nItems = JSON.parse(localStorage.getItem("copy"));
        if (nItems != null && nItems.length > 0) {
            this.codigos = ["123AB_10", "456CD_20", "789EF_30"];
            localStorage.setItem("codigos", JSON.stringify(this.codigos));
            this.init();
        }
        else {
            //this.alertMessage("No se ha seleccionado ningún artículo de la tienda!!!");
            this.items.push(this.item1);
            this.items.push(this.item2);
            localStorage.setItem("copy", JSON.stringify(this.items));
            this.codigos = ["123AB_10", "456CD_20", "789EF_30"];
            localStorage.setItem("codigos", JSON.stringify(this.codigos));
            this.init();
        }
    }
    /**
     * Método que administra los eventros.
     */
    Cart.prototype.init = function () {
        var _this = this;
        this.items = JSON.parse(localStorage.getItem("copy"));
        this.drawItems(this.items);
        this.costItems();
        for (var index = 0; index < this.items.length; index++) {
            document.getElementById("add_" + this.items[index].id).addEventListener("click", function (msg) {
                var id = JSON.stringify(msg.target.id).split("_");
                _this.addQuantity(id[1].slice(0, id[1].length - 1));
            });
            document.getElementById("less_" + this.items[index].id).addEventListener("click", function (msg) {
                var id = JSON.stringify(msg.target.id).split("_");
                _this.lessQuantity(id[1].slice(0, id[1].length - 1));
            });
            document.getElementById("deleteItem_" + this.items[index].id).addEventListener("click", function (msg) {
                var id = JSON.stringify(msg.target.id).split("_");
                _this.deleteItem(id[1].slice(0, id[1].length - 1));
            });
        }
        var checked = document.getElementById("cupon").addEventListener("click", function (check) {
            if (check.currentTarget.checked) {
                document.getElementById("country").removeAttribute("disabled");
                document.getElementById("city").removeAttribute("disabled");
                document.getElementById("numCod").removeAttribute("readonly");
                document.getElementById("validar").removeAttribute("disabled");
                document.getElementById("validar").addEventListener("click", _this.discount);
            }
            else {
                document.getElementById("country").setAttribute("disabled", "");
                document.getElementById("city").setAttribute("disabled", "");
                document.getElementById("numCod").setAttribute("readonly", "");
                document.getElementById("validar").setAttribute("disabled", "");
            }
        });
        this.getFacture();
        document.getElementById("checkOut").addEventListener("click", this.goCheckOut);
    };
    /**
     * Método que muestra los items seleccionados en el carrito en una tabla.
     */
    Cart.prototype.drawItems = function (items) {
        var tabla = document.getElementById("products");
        for (var i = 0; i < items.length; i++) {
            //Fila de la tabla
            var row = document.createElement("TR");
            row.setAttribute("id", "row_" + items[i].id);
            //Campo de la imágen
            var product = document.createElement("TD");
            product.setAttribute("class", "cart_product");
            var img = document.createElement("IMG");
            img.setAttribute("id", "img_" + items[i].id);
            img.setAttribute("src", items[i].image);
            product.appendChild(img);
            //Datos del producto
            var description = document.createElement("TD");
            description.setAttribute("class", "cart_description");
            var name_1 = document.createElement("H4");
            name_1.setAttribute("id", "name_" + items[i].id);
            name_1.appendChild(document.createTextNode(items[i].name));
            var id = document.createElement("P");
            id.setAttribute("id", items[i].id);
            id.appendChild(document.createTextNode(items[i].id));
            description.appendChild(name_1);
            description.appendChild(id);
            //Precio individual
            var price = document.createElement("TD");
            price.setAttribute("class", "cart_price");
            var cost = document.createElement("P");
            cost.setAttribute("id", "cost_" + items[i].id);
            cost.appendChild(document.createTextNode(items[i].cost + ""));
            price.appendChild(cost);
            //Cantidad de un mismo producto
            var quantity = document.createElement("TD");
            quantity.setAttribute("class", "cart_quantity");
            var div = document.createElement("DIV");
            div.setAttribute("class", "cart_quantity_button");
            var add = document.createElement("A");
            add.setAttribute("id", "add_" + items[i].id);
            add.setAttribute("type", "submit");
            add.appendChild(document.createTextNode("+"));
            var quantItems = document.createElement("INPUT");
            quantItems.setAttribute("id", "quantItems_" + items[i].id);
            quantItems.setAttribute("class", "cart_quantity_input");
            quantItems.setAttribute("type", "text");
            quantItems.setAttribute("autocomplete", "off");
            quantItems.setAttribute("min", "1");
            if (JSON.parse(localStorage.getItem("quantItems_" + items[i].id)) != null)
                quantItems.setAttribute("value", JSON.parse(localStorage.getItem("quantItems_" + this.items[i].id)));
            else
                quantItems.setAttribute("value", "1");
            quantItems.setAttribute("readonly", "");
            var less = document.createElement("A");
            less.setAttribute("id", "less_" + items[i].id);
            less.setAttribute("type", "submit");
            less.appendChild(document.createTextNode("-"));
            div.appendChild(add);
            div.appendChild(quantItems);
            div.appendChild(less);
            quantity.appendChild(div);
            //Costo total del mismo producto
            var total = document.createElement("TD");
            total.setAttribute("class", "cart_total");
            var costItems = document.createElement("INPUT");
            costItems.setAttribute("id", "costItems_" + items[i].id);
            costItems.setAttribute("class", "cart_total");
            costItems.setAttribute("type", "text");
            costItems.setAttribute("readonly", "");
            total.appendChild(costItems);
            //Botón de borrar item.
            var delet = document.createElement("TD");
            delet.setAttribute("class", "cart_delete");
            var deletItem = document.createElement("A");
            deletItem.setAttribute("id", "deleteItem_" + items[i].id);
            deletItem.setAttribute("class", "cart_quantity_delete");
            deletItem.setAttribute("type", "submit");
            deletItem.appendChild(document.createTextNode("X"));
            delet.appendChild(deletItem);
            //Agregar columnas a la fila.
            row.appendChild(product);
            row.appendChild(description);
            row.appendChild(price);
            row.appendChild(quantity);
            row.appendChild(total);
            row.appendChild(delet);
            tabla.appendChild(row);
        }
    };
    /**
     * Método que aumente el número de un mismo artículo.
     */
    Cart.prototype.addQuantity = function (id) {
        this.items = JSON.parse(localStorage.getItem("copy"));
        var input = parseInt(document.getElementById("quantItems_" + id).getAttribute("value"));
        var quantity = (isNaN(input)) ? 1 : input;
        var search = false;
        for (var index = 0; index < this.items.length && !search; index++) {
            if (this.items[index].quantity > 1 && this.items[index].id == id) {
                search = true;
                quantity++;
                localStorage.setItem("quantItems_" + id, quantity + "");
                this.items[index].quantity--;
                document.getElementById("quantItems_" + id).setAttribute("value", quantity + "");
                localStorage.setItem("copy", JSON.stringify(this.items));
                this.costItems();
                this.getFacture();
            }
        }
    };
    /**
     * Método que resta el número de un mismo artículo.
     */
    Cart.prototype.lessQuantity = function (id) {
        this.items = JSON.parse(localStorage.getItem("copy"));
        var input = parseInt(document.getElementById("quantItems_" + id).getAttribute("value"));
        if (isNaN(input))
            this.alertMessage("Sólo tiene un artículo!!!");
        else if (input > 0) {
            var quantity = input;
            var search = false;
            for (var index = 0; index < this.items.length && !search; index++) {
                if (quantity > 1 && this.items[index].id == id) {
                    quantity--;
                    localStorage.setItem("quantItems_" + id, quantity + "");
                    this.items[index].quantity++;
                    document.getElementById("quantItems_" + id).setAttribute("value", quantity + "");
                    localStorage.setItem("copy", JSON.stringify(this.items));
                    this.costItems();
                    this.getFacture();
                }
            }
        }
    };
    /**
     * Método que calcula el valor con respecto al número de productos que lleva.
     */
    Cart.prototype.costItems = function () {
        this.items = JSON.parse(localStorage.getItem("copy"));
        for (var index = 0; index < this.items.length; index++) {
            var numItems = parseInt(document.getElementById("quantItems_" + this.items[index].id).getAttribute("value"));
            var quantity = (isNaN(numItems)) ? 1 : numItems;
            var cost = this.items[index].cost * quantity;
            document.getElementById("costItems_" + this.items[index].id).setAttribute("value", "$ " + cost);
        }
    };
    /**
     * Método que elimina un producto.
     * @param id identificador del elemento.
     */
    Cart.prototype.deleteItem = function (id) {
        this.items = JSON.parse(localStorage.getItem("copy"));
        var search = false;
        for (var index = 0; index < this.items.length && !search; index++) {
            if (this.items[index].id == id) {
                search = true;
                document.getElementById("products").removeChild(document.getElementById("row_" + id));
                this.items.splice(index, 1);
                localStorage.setItem("copy", JSON.stringify(this.items));
            }
        }
    };
    /**
     * Método que calcula el subtotal.
     */
    Cart.prototype.subTotal = function () {
        document.getElementById("subTotal").textContent = "";
        this.items = JSON.parse(localStorage.getItem("copy"));
        var cost = 0;
        for (var index = 0; index < this.items.length; index++) {
            var val = (document.getElementById("costItems_" + this.items[index].id)).getAttribute("value").split(" ")[1];
            cost = cost + parseInt(val);
        }
        document.getElementById("subTotal").appendChild(document.createTextNode("$ " + cost));
    };
    /**
     * Método que calcula el iva.
     */
    Cart.prototype.iva = function () {
        document.getElementById("iva").textContent = "";
        var val = parseInt((document.getElementById("subTotal").textContent).split(" ")[1]);
        var iva = val - ((val * 19) / 100);
        document.getElementById("iva").appendChild(document.createTextNode("$ " + iva));
    };
    /**
     * Método que calcula el descuento.
     */
    Cart.prototype.discount = function () {
        document.getElementById("discount").textContent = "";
        this.codigos = JSON.parse(localStorage.getItem("codigos"));
        var aux = document.getElementById("numCod");
        var cod = aux.getAttribute("value");
        if (this.codigos.length > 0) {
            if (cod != "" && cod != null) {
                for (var index = 0; index < this.codigos.length; index++) {
                    if ((this.codigos[index]).split("_")[0] == cod) {
                        var val = parseInt((document.getElementById("subTotal").textContent).split(" ")[1]);
                        var discount = val - ((val * parseInt((this.codigos[index]).split("_")[1])) / 100);
                        document.getElementById("discount").appendChild(document.createTextNode("$ " + discount));
                    }
                }
            }
            else
                document.getElementById("discount").appendChild(document.createTextNode("$ 0"));
        }
        else {
            this.alertMessage("No existen descuentos por el momento.");
            document.getElementById("discount").appendChild(document.createTextNode("$ 0"));
        }
    };
    /**
     * Método que calcula el total.
     */
    Cart.prototype.getTotal = function () {
        document.getElementById("total").textContent = "";
        var subTotal = parseInt((document.getElementById("subTotal").textContent).split(" ")[1]);
        var discount = parseInt((document.getElementById("discount").textContent).split(" ")[1]);
        var total = subTotal - discount;
        document.getElementById("total").appendChild(document.createTextNode("$ " + total));
    };
    /**
     * Método que inicializa los datos de la factura.
     */
    Cart.prototype.getFacture = function () {
        this.subTotal();
        this.iva();
        this.discount();
        this.getTotal();
    };
    /**
     * Método que cambia de vista.
     */
    Cart.prototype.goCheckOut = function () {
        window.location.href = "checkout.html";
    };
    /**
     * Método que envía un mensaje de alerta al usuario.
     * @param msg Mesaje que se quiere mostrar al usuario.
     */
    Cart.prototype.alertMessage = function (msg) {
        alert(msg);
    };
    return Cart;
}());
//# sourceMappingURL=cart.js.map