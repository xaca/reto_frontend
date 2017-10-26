var producto = {id:"-1", nombre:"No encontrado", precio:0, descripcion:"No tiene", calificacion:0};


$( document ).ready(function() {



	$("#btn_añadir_carro").click(function(){
	     localStorage.setItem("productoCarro", JSON.stringify(producto));
	     var retrievedObject = localStorage.getItem('productoCarro');
	     var alejo = JSON.parse(retrievedObject)
	console.log(alejo.id);

	});


	$("#btn_anadir_deseos").click(function(){
	       localStorage.setItem("productoDeseos", JSON.stringify(producto));

	});


});