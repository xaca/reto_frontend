//definicion de variables
$(document).ready(function () {
	$.ajax({  
		type: 'GET',
		url: 'https://jsonplaceholder.typicode.com/posts',  
		success: function (response) {
			var precioArticulos = 0;
			var precioTotal = 0;
			for(var i=0; i < response.length;i++){
				precioArticulos += response[i].id;
				var tr = '<tr><td>';
				tr += '<h3><a href="">'+response[i].id+'</a></h3>';
				tr += '<p>Codigo:'+response[i].userId+'</p> </td>';
				tr += '<td> <p>'+response[i].precio+'</p> </td>';								
				tr += '<td>'+response[i].cantidad+'</td>';
				tr += '<td> <p>'+response[i].cantidad*response[i].precio+'</p> </td></tr>';
				$("#articulos").append(tr);		
			}

			$("#precioArticulos").text(precioArticulos);
			$("#precioTotal").text(precioArticulos+precioArticulos*0.19);
			$("#costoEnvio").text(parseInt(Math.random() * (10000 - 0)));	
		}
	});
	console.log("Prueba");
});
