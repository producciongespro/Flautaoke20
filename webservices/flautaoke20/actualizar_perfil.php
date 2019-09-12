<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
header("Content-Type: text/html; charset=utf-8");
$method = $_SERVER['REQUEST_METHOD'];
  require 'conectar.php';
   $centro_educativo = $_POST['correo'];
   $formacion =  $_POST['formacion'];
   $clases = $_POST['clases'];
   $notificaciones =  $_POST['notificaciones'];
   $tiene_correo = $_POST['tiene_correo'];
   $correo = $_POST['correo'];
   $mysqli = conectarDB();
    mysqli_query($mysqli,"UPDATE `usuarios` SET `centro_educativo`='$centro_educativo' `formacion`='$formacion',`clases`= '$clases',`tiene_correo`='$tiene_correo',`notificaciones`='$notificaciones',`correo`='$correo'") or die ("Problemas al actualizar elementos a la BD".mysqli_error($mysqli));
?>
