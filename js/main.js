var producto = {id:"-1", nombre:"No encontrado", precio:0, descripcion:"No tiene", calificacion:0};


$( document ).ready(function() {
	 localStorage.setItem("producto", JSON.stringify(producto));
	 var objeto = localStorage.getItem('producto');
	 var product = JSON.parse(objeto);

	 $("#div_nombre_producto").text("Producto: "+product.nombre);
	 $("#div_precio_producto").text("Precio: "+product.precio);
	 $("#div_descripcion_producto").text("Descripción: "+product.descripcion);
	 $("#div_calificacion_producto").text("Calificación: "+product.calificacion);


	$("#btn_añadir_carro").click(function(){
	     localStorage.setItem("productoCarro", JSON.stringify(producto));
	     
	

	});


	$("#btn_anadir_deseos").click(function(){
	       localStorage.setItem("productoDeseos", JSON.stringify(producto));

	});


});