//Llama la funcion init cuando carga la pagina
window.onload = iniciar;
// Creacion de las variables
var xhr, respuestaRest, salida, contenedor, longitudRespuesta, numeroPaginas, paginaActual, paginasMostradas, botones, textos;
//Primera funcion que se ejecuta
function iniciar() {
	inicializarVariables();
	inicializarEventos();
}

//funcion que inicializa todas las variables necesarias
function inicializarVariables(){
	//variable donde se hara la solicitud a la API
	xhr = new XMLHttpRequest();
	//Div que contiene los elementos
	contenedor = document.getElementById("resultado");
	//respuesta de la solicitud en JSON
	respuestaRest = "";
	//Lingitud de la respuestaRest
	longitudRespuesta = 0;
	//Numero de paginas necesarias para mostrar todos los elementos
	numeroPaginas = 0;
	//pagina actual que se esta mostrando
	paginaActual = 1;
	//Rango de paginas que se estan mostrando
	paginasMostradas = 5;

	botones= [];
	textos = [];
	//Botones del menu de paginación
	botones[0] = document.getElementById("botonA");
	botones[1] = document.getElementById("botonB");
	botones[2] = document.getElementById("botonC");
	botones[3] = document.getElementById("botonD");
	botones[4] = document.getElementById("botonE");
	botones[5] = document.getElementById("botonAtras");
	botones[6] = document.getElementById("botonAdelante");
	//Textos del menu de paginación
	textos[0] = document.getElementById("textoA");
	textos[1] = document.getElementById("textoB");
	textos[2] = document.getElementById("textoC");
	textos[3] = document.getElementById("textoD");
	textos[4] = document.getElementById("textoE");
}

//funcion que inicializa los eventos de los botones
function inicializarEventos(){
	iniciarRest();
	for(var i in botones)
	{
		botones[i].addEventListener("click",procesarClick);
	}
}


//Llama al servicio rest
function iniciarRest(){
	xhr.open("GET", "https://jsonplaceholder.typicode.com/photos", true);
	xhr.onload = procesarSolicitud;
	xhr.send();
}

//Procesa el restulado del servicio rest
function procesarSolicitud(){
	respuestaRest = JSON.parse(xhr.responseText);
	crearPaginacion();
	llenarPagina();
}

//Crea el numero de paginas que se necesitan
function crearPaginacion(){
	longitudRespuesta = Object.keys(respuestaRest).length;
	numeroPaginas = longitudRespuesta / 10;

}

//Llena la pagina con los elementos
function llenarPagina(){
	limpiarPagina();
	for (var i = (paginaActual-1)*10; i<paginaActual*10; i++) {
		salida = document.createElement('img');
		salida.src = respuestaRest[i].thumbnailUrl;
		contenedor.appendChild(salida);
	}
}

//Limpia la pagina de los elementos
function limpiarPagina(){
	while (contenedor.firstChild) {
    	contenedor.removeChild(contenedor.firstChild);
	}
}

//procesa el click del boton dependiendo de cual se presionó
function procesarClick(){
	if(this.id == "botonAtras"){
		if (paginasMostradas > 5) {
			for (var i = 0; i < 5; i++) {
				textos[i].innerText = Number(textos[i].outerText) - 5;
			}
			paginasMostradas = paginasMostradas - 5;
			reiniciarBotones();
		}
	}else if (this.id == "botonAdelante"){
		if (paginasMostradas < numeroPaginas){
			for (var i = 0; i < 5; i++) {
				textos[i].innerText = Number(textos[i].outerText) + 5;
			}
			paginasMostradas = paginasMostradas + 5;
			reiniciarBotones();
		}
	}else{
		//obtiene el numero de el label que contiene el boton que llamo al evento
		paginaActual = Number(this.firstElementChild.outerText);
		llenarPagina();
		reiniciarBotones();
		this.className = "btn";
	}
}

//Pone todos los botones por defecto
function reiniciarBotones(){
		for (var i = 0; i< botones.length; i++) {
			botones[i].className = "btn btn-default";
		}
}