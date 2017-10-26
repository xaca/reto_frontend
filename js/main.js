var producto = {id:"-1", nombre:"Producto 1", precio:100000, descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit", calificacion:4.5, imagen:"img/imagen_gris.png"};


$( document ).ready(function() {

	
	//var root = 'https://my-json-server.typicode.com/alejobg/datos';

$.ajax({
  url: 'https://my-json-server.typicode.com/alejobg/datos',
  method: 'GET'
}).then(function(data) {
  
  console.log(data);
});


	 localStorage.setItem("producto", JSON.stringify(producto));
	 var objeto = localStorage.getItem('producto');
	 var product = JSON.parse(objeto);

	 

	 $("#div_nombre_producto").text("Producto: "+product.nombre);
	 $("#div_precio_producto").text("Precio: "+product.precio);
	 $("#div_descripcion_producto").text(product.descripcion);
	 $("#div_calificacion_producto").text("Calificación: "+product.calificacion);
	 $("#img_producto").attr("src",product.imagen);


	$("#btn_añadir_carro").click(function(){
	     localStorage.setItem("productoCarro", JSON.stringify(producto));
	     
	

	});


	$("#btn_anadir_deseos").click(function(){
	       localStorage.setItem("productoDeseos", JSON.stringify(producto));

	});


});