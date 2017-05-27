var sesionUPeU=localStorage.getItem("Nombre"); 
if(sesionUPeU==="INICIO_SESION"){
    outputPeople();
    //document.getElementById("nuevo").style.visibility = "hidden";
}

var guardar = document.getElementById("guardar");
var search_btn = document.getElementById("search_button");
if (guardar) {
  guardar.addEventListener("click", addAndUpdate);
}
if (search_btn) {
  search_btn.addEventListener("click",search);
}
function search(){
  if(mydb){
    var search_value = document.getElementById("search").value;
    //if(search_value!==""){
      mydb.transaction(function(t){
        t.executeSql('SELECT * FROM persona WHERE (nombre LIKE ? or dni LIKE ?)', ['%'+search_value+'%','%'+search_value+'%'], updatePersonList);
      });
    //}
    //else {
    //  alert("El valor no puede estar vació");
    //}
  }else {
    alert("db no");
  }
}

function salirSistema(){
if(confirm("Esta seguro de Salir...?")===true){
    localStorage.removeItem("INICIO_SESION");
    localStorage.removeItem("IdPersona");
    document.location.href="index.html";
    }
}

function addAndUpdate() {
    //alert("Holas");

  if (mydb){
    var genero;
    var sexo = document.getElementsByName("sexo");
    for (var i = 0; i < sexo.length; i++) {
      if (sexo[i].checked) {
        genero=sexo[i].value;
      }
    }
    var estudio;
    var grado = document.getElementsByName("nivel");
    for (var i = 0; i < grado.length; i++) {
      if (grado[i].checked) {
        estudio=grado[i].value;
      }
    }
     console.log("LLega aqui!!");
    var nombre = document.getElementById("name").value;
    var apellidos = document.getElementById("apellidos").value;
    var dni = document.getElementById("dni").value;
    var nacimiento = document.getElementById("fecha-de-nacimiento").value;
    var profesion = document.getElementById("profesion").value;
    var email= document.getElementById("e-mail").value;
    var telefono = document.getElementById("phone").value;
    var validarclave = document.getElementById("v-clave").value;
    var usuario = document.getElementById("usuario").value;
    var clave = document.getElementById("clave").value;

    if(nombre !== "" && apellidos !== "" && dni !== "" && nacimiento !== "" && genero !== "" &&profesion !== ""&& estudio!== "" && email !== "" && telefono !== "" && usuario !== "" && clave !== "" &&  validarclave !=="" ){
        if(document.getElementById("idpersona").value===""){
        mydb.transaction(function(t){
        t.executeSql("INSERT INTO persona(nombre,apellidos,dni,nacimiento,genero,profesion, estudios,email,telefono,usuario,clave,validarclave) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",[nombre,apellidos,dni,nacimiento,genero,profesion,estudio,email,telefono,usuario,clave,validarclave]);
         alert("funciona");
         outputPeople();
         window.location = "mainPersona.html";
         });
         }else{
        mydb.transaction(function(t){
        t.executeSql("UPDATE persona SET nombre=?,apellidos=?,dni=?,nacimiento=?,genero=?,profesion=?, estudios=?,email=?,telefono=?,usuario=?,clave=?,validarclave=? WHERE idpersona=?",[nombre,apellidos,dni,nacimiento,genero,profesion,estudio,email,telefono,usuario,clave,validarclave,document.getElementById("idpersona").value]);
         alert("se actualizo!!!");
         outputPeople();
         window.location = "mainPersona.html";
         });
         }
    }else if(clave === validarclave){
      alert("Faltan espacios por llenar");

    }
    else {
      alert("vuelve a escribir la clave");
    }
  }else {
    alert("db no");
  }

}
function outputPeople() {
    if (mydb) {
        mydb.transaction(function (t) {
            t.executeSql("SELECT * FROM persona", [], updatePersonList );
        });
    } else {
        alert("db no encontrado");
    }
}
var buscador = 1;

function updatePersonList(transaction,results) {
    var tabla = document.getElementById("table");
    var messages = document.getElementById('messages');
    var template = "";
    if (tabla) {

      tabla.innerHTML = "";

    }
    if (results.rows.length > 0) {
      for (i = 0; i < results.rows.length; i++) {
        var row = results.rows.item(i);
        buscador += i;
        console.log("dato"+ row.id);

        template +="<tr><td>"+ row.idpersona+" </td> ";
        template +=" <td>"+ row.nombre+" </td>";
        template += "<td>"+ row.apellidos+"</td>";
        template +=" <td>"+ row.dni+" </td>";
        template += "<td>"+ row.genero+" </td>";
        template += "<td> <input type= checkbox  class=estado/> </td>";
        template +=  "<td><a  href='create_person.html?idPersona="+row.idpersona+"' class= 'editarfila'> E </a> <a onclick='deletepersona(" + row.idpersona + ");' class= 'borrarfila'  >X</a> </td></tr>";
      }
      if (tabla ) {
        tabla.innerHTML = template;
        if (messages) {
          messages.innerHTML = (results.rows.length) + " resultados";

        }
      }
      document.getElementById("nuevo").style.visibility = "hidden";
      document.getElementById("msgNoExiste").style.visibility = "hidden";
    }
    else {
      if (tabla ) {

        tabla.innerHTML = "";
        if (messages) {

          messages.innerHTML = "Ningun dato para mostrar";
        }
      }
      document.getElementById("nuevo").style.visibility = "visible";
      document.getElementById("msgNoExiste").style.visibility = "visible";
    }


}


function deletepersona(id) {
    var mensaje = confirm("estas seguro de eliminar?");
    if (mydb && mensaje) {
      mydb.transaction(function (t) {
        console.log(id);
        t.executeSql("DELETE FROM persona WHERE rowid=?", [id], outputPeople);
        alert("borro0");

        });
    } else {
        alert("Gracias por no borrarme");
    }
}

function editarPersona(id){
    if(mydb){
      mydb.transaction(function (t, result){
            t.executeSql("select * FROM persona WHERE idpersona=?", [id], function(textTX,results) {
            if(results.rows.length===1){
            var rows= results.rows.item(0);
            document.getElementById("name").value=rows.nombre;
            document.getElementById("apellidos").value=rows.apellidos;
            document.getElementById("dni").value=rows.dni;
            document.getElementById("profesion").value=rows.profesion;
            document.getElementById("fecha-de-nacimiento").value=rows.nacimiento;
            if(rows.genero==="masculino"){document.getElementById("masculino").checked=true;}else{document.getElementById("femenino").checked = true;}
            document.getElementById("e-mail").value=rows.email;
            if(rows.estudios==="Bachiller"){document.getElementById("bachiller").checked=true;}else if(rows.estudios==="Magister"){document.getElementById("magister").checked = true;}else{document.getElementById("doctorado").checked = true;}
            document.getElementById("phone").value=rows.telefono;
            document.getElementById("usuario").value=rows.usuario;
            document.getElementById("clave").value=rows.clave;
            document.getElementById("v-clave").value=rows.validarclave;
            document.getElementById("idpersona").value=rows.idpersona;
            //INSERT INTO persona(,,,,genero,profesion, estudios,email,telefono,usuario,clave,validarclave) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",["David","Mamani Pari","43631917","2017-01-01","Masculino","Administrador","Magister","davidmp@upeu.pe","951782520","admin","123456","123456"]
            }
            });
        });
    } else {
        alert("Gracias por no borrarme");
    }
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

if(getParameterByName("idPersona")!=="" || getParameterByName("idPersona")!==null){
    editarPersona(getParameterByName("idPersona"));
}



var limpiar =document.getElementById("limpiar");
if (limpiar) {

  limpiar.addEventListener("click", nuevo);
}

function nuevo(){

  var nombre = document.getElementById("name");
  var apellido = document.getElementById("apellidos");
  var dni= document.getElementById("dni");
  var profesion = document.getElementById("profesion");
  var e_mail = document.getElementById("e-mail");
  var phone = document.getElementById("phone");
  var usuario = document.getElementById("usuario");
  var clave = document.getElementById("clave");
  var validarclave = document.getElementById("v-clave");

  nombre.value = "";
  apellido.value="";
  dni.value="";
  profesion.value="seleccione";
  e_mail.value="";
  phone.value="";
  usuario.value="";
  clave.value="";
  validarclave.value="";

}
