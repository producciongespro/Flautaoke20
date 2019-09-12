<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
header("Content-Type: text/html; charset=utf-8");
$method = $_SERVER['REQUEST_METHOD'];
  require 'conectar.php';

  // $id_cancion = $_POST['id_cancion'];
  // $id_usuario = $_POST['id_usuario'];
  // $puntos_trivia = $_POST['puntos_trivia'];
  // $puntos_notas1 = $_POST['puntos_notas1'];
  // $puntos_notas2 = $_POST['puntos_notas2'];
  // $finalizado = $_POST['valor_finalizdo'];
  $id_cancion = 1;
  $id_usuario = 1;
  $puntos_trivia = 200;
  $puntos_notas1 = 200;
  $puntos_notas2 = 200;
  $finalizado = 1;

sleep(1);

$mysqli = conectarDB();

      mysqli_query($mysqli,"INSERT INTO puntajes (id_can,id_usu,trivia,notas1,notas2,finalizada) VALUES
                                              ('$id_cancion','$id_usuario','$puntos_trivia','$puntos_notas1','$puntos_notas2','$finalizado')") or die ("Problemas al añadir elementos a la BD".mysqli_error($mysqli));
      $errors = array();

mysqli_close($mysqli);
?>
