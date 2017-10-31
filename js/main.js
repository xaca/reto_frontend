$( document ).ready(function() {

    //var seccion_inicio = $("#seccion_inicio");
    //var seccion_registro = $("#seccion_registro");
    //var seccion_principal = $("seccion_principal");

    var btn_registrar;
    var btn_login;
    var btn_registro;

    var mail_login;
    var username_login;

    var id;
    var nombre;
    var username;
    var mail;
    var telefono;
    var sitio_web;
    var calle;
    var num_apartamento;
    var ciudad;
    var codigo_postal;
    var latitud;
    var longitud;
    var nombre_compania;
    var lema;
    var bs;
    var json_doc;

    var form_registro;


    $.ajax('http://jsonplaceholder.typicode.com/users', {
       method: 'GET'
    }).then(function(data) {
        console.log(data);
        localStorage.setItem("usuarios_data",JSON.stringify(data));
      });
        


  $("#btn_registro").click(function(){
    $("#seccion_registro").show();
    $("#seccion_inicio").hide();
  });

   
  $("#btn_login").click(function () {

    username_login = $("#txtusername_login").val();
    mail_login = $("#txtmail_login").val();

    var data = JSON.parse(localStorage.getItem("usuarios_data"));

    if (username_login!="" && mail_login !="") {
      for(var i in data){
        if (data[i].username ==username_login) {
          console.log(data[i].username);
          if (data[i].email==mail_login) {
            console.log(data[i].email);
            console.log("Estas logeado");
            $("#seccion_principal").show();
            $("#seccion_inicio").hide();

          }
          
        }
        
      }
    }
    else{
      alert("Ingresa todos los datos");
    }


  });

  
$("#btn_registrar").click(function () {

    var usuarios = JSON.parse(localStorage.getItem("usuarios_data"));
    console.log(usuarios);
      
      id =   usuarios.length + 1;    
      nombre = $("#txtnombre").val();
      username = $("#txtusername").val();
      mail = $("#txtmail").val();
      telefono = $("#txttelefono").val();
      sitio_web = $("#txtsitio_web").val();
      calle = $("#txtcalle").val();
      num_apartamento = $("#txtnum_apartamento").val();
      ciudad = $("#txtciudad").val();
      codigo_postal = $("#txtcodigo_postal").val();
      latitud = $("#txtlatitud").val();
      longitud = $("#txtlongitud").val();
      nombre_compania = $("#txtnombre_compania").val();
      lema = $("#txtlema").val();
      bs = $("#txtbs").val();

      if (id!="" && nombre!="" && username!="" && mail!= "" && telefono!= "" && sitio_web!= "" && calle!= "" && num_apartamento!= "" && ciudad!= "" && codigo_postal!= "" && latitud!= "" && longitud!= "" && nombre_compania!= "" && lema!= "" && bs!= "") {
      var usuario = {};
      usuario.id = id;
      usuario.name = nombre;
      usuario.username = username,
      usuario.email =  mail;
      var address = {};
      address.street = calle;
      address.suite = num_apartamento;
      address.city = ciudad;
      address.zipcode = codigo_postal;
      var geo = {};
      geo.lat = latitud;
      geo.lng = longitud;
      address.geo=geo;
      usuario.address=address;
      usuario.phone = telefono;
      usuario.website = sitio_web;
      var company={};
      company.name = nombre_compania;
      company.catchPhrase = lema;
      company.bs = bs;
      usuario.company=company;
      console.log(usuario);

      usuarios.push(usuario);
      localStorage.setItem("usuarios_data", JSON.stringify(usuarios));
     
      var usuarios_ls = JSON.parse(localStorage.getItem("usuarios_data"));
      console.log(usuarios_ls);
      $("#seccion_inicio").show();
      $("#seccion_registro").hide();
    }
    else{
      alert("Ingresa todos los datos");
    }

  });

});

  



  
