window.onload = init;

var comentar;

var vpostId;
var vid=0;
var vname;
var vemail;
var vbody;

function init()
{
	console.log("entra");
	comentar = document.getElementById("comentar");
	comentar.addEventListener("click",agregarComentario);

	$.ajax('http://jsonplaceholder.typicode.com/comments', {
	  method: 'GET'
	}).then(function(data) {
		vid = data.length + 1;
		console.log("entraaa");
	});


	mostrarDatos();

}


}
