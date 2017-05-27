/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

mydb=openDatabase("upeu", "0.1", "formulario base de datos", 2*1024*1024);

mydb.transaction(function (tx) {
  //tx.executeSql('DROP TABLE IF EXISTS asd');
  tx.executeSql("CREATE TABLE IF NOT EXISTS persona(idpersona integer primary key autoincrement,\n\
              nombre text , apellidos text ,dni integer , nacimiento date, genero text,\n\
              profesion text, estudios text , email text , telefono integer, \n\
              usuario text, clave text , validarclave text)");
//tx.executeSql("INSERT INTO persona(nombre,apellidos,dni,nacimiento,genero,profesion, estudios,email,telefono,usuario,clave,validarclave) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",["David","Mamani Pari","43631917","2017-01-01","Masculino","Administrador","Magister","davidmp@upeu.pe","951782520","admin","123456","123456"]);

  tx.executeSql("SELECT * FROM persona WHERE usuario=?", ["admin"], function(txx,results){
      if(results.rows.length===0){
        tx.executeSql("INSERT INTO persona(nombre,apellidos,dni,nacimiento,genero,profesion, estudios,email,telefono,usuario,clave,validarclave) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",["David","Mamani Pari","43631917","2017-01-01","masculino","Administrador","Magister","davidmp@upeu.pe","951782520","admin","123456","123456"]);
      }
    },null);

});
