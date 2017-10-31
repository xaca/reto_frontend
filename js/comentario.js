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

function agregarComentario()
{
	vpostId = 1;
	$.ajax('http://jsonplaceholder.typicode.com/comments', {
	  method: 'GET'
	}).then(function(data) {
		vid = data.length + 1;
	});
	vname = document.getElementById("tituloComentario").value;
	vemail = 'a@a.com'
	vbody = document.getElementById("comentario").value;

	$.ajax('http://jsonplaceholder.typicode.com/comments', {
  method: 'POST',
  data: {
    postId: vpostId,
    id: vid,
    name: vname ,
		email: vemail,
		body: vbody
  }
	}).then(function(data) {
	  console.log(data);
	});

}


function mostrarDatos()
{
	$.ajax('http://jsonplaceholder.typicode.com/comments?postId=1', {
	//$.ajax('http://jsonplaceholder.typicode.com/comments', {
	  method: 'GET'
	}).then(function(data) {
	  console.log(data);
		var codigo='';
		//document.getElementById("mostrarNombre").innerHTML=('Hola '+nombre+ ' tu tienes: '+anos+' años');
		for (i = 0; i < data.length; i++) {
			codigo += "<tr> <td> <h4>Comentario"+i+": </h3> </td> <td>"+ data[i].name +" </td> </tr>";
			codigo += "<tr> <td>  </td>  <td>"+ data[i].body +" </td> </tr>";
		}
		document.getElementById("tabla").innerHTML=(codigo);
	});
}
