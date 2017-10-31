


































































































//var producto = {id:"-1", nombre:"Producto 1", precio:100000, descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit", calificacion:4.5, imagen:"img/imagen_gris.png"};

//la funcion carga la informacion de un producto, y la muestra en las etiquetas correspondientess
$( document ).ready(function() {
	var objeto;
	var product;	
	$.ajax({
	  	url: 'https://jsonplaceholder.typicode.com/posts/5',
	 	dataType : 'json',
	  	method: 'GET'
	}).then(function(data) {
	   	localStorage.setItem("producto", JSON.stringify(data));
	  	console.log(data);
	});
		/* localStorage.setItem("producto", JSON.stringify(producto));*/
	objeto = localStorage.getItem('producto');
	product = JSON.parse(objeto);


	$("#div_nombre_producto").text("Producto: "+product.title);
	$("#div_descripcion_producto").text(product.body);
	$("#img_producto").attr("src",'img/imagen_gris.png');
	$("#div_precio_producto").text("Precio: "+product.userId);


	// La funcion añade la informacion de un producto al localstorage identificandolo como productoCarro
	$("#btn_añadir_carro").click(function(){
	    localStorage.setItem("productoCarro", JSON.stringify(objeto));
	});

	// La funcion añade la informacion de un producto al localstorage identificandolo como productoDeseos
	$("#btn_anadir_deseos").click(function(){
	    localStorage.setItem("productoDeseos", JSON.stringify(objeto));
	});


});