<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
header("Content-Type: text/html; charset=utf-8");
$method = $_SERVER['REQUEST_METHOD'];
  require 'conectar.php';
   // $usuario =  "test1";
   // $avance = '[{"avance": "5", "nombre": "cana_dulce"}, {"avance": "5", "nombre": "cancion_cuna"}, {"avance": "5", "nombre": "cielito_lindo"}, {"avance": "4", "nombre": "canto_ala_seleccion"}]';
   $usuario =  utf8_decode($_POST['usuario']);
   $avance = $_POST['avance'];

   $mysqli = conectarDB();
  mysqli_query($mysqli,"UPDATE usuarios SET avance='$avance' WHERE usuario = '$usuario'") or die ("Problemas al actualizar elementos a la BD".mysqli_error($mysqli));
  
?>
