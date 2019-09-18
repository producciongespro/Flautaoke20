<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");
$method = $_SERVER['REQUEST_METHOD'];



$sql = "SELECT * FROM avance_usuarios ORDER BY id";
include "conectar.php";

	$JSONData = file_get_contents("php://input");
	$dataObject = json_decode($JSONData);            
    $mysqli->set_charset('utf8');
	    
	$usuario = $dataObject-> usuario;
	$pas =	$dataObject-> clave;


function desconectar($conexion){
		echo "Desconectar \r";

    $close = mysqli_close($conexion);

        if($close){
            echo "Cerrando conexion";
        }else{
            echo 'Ha sucedido un error inexperado en la desconexion de la base de datos
';
        }

    return $close;
}

function obtenerArreglo($sql){
	$vacio=null;	
		$conexion = conectarDB();  
	if(!$resultado = mysqli_query($conexion, $sql)) {
		$vacio = 1;
	} else {
		$vacio = 0 ;
	}

				if (!$vacio) {
					echo "no está vacio";
						} else {
					echo "está vacio";
					}

	
    $arreglo = array();    
    $i=0;

/*
    while($row = mysqli_fetch_assoc($resultado))
    {
        $arreglo[$i] = $row;
        $i++;
    }
	*/
    desconectar($conexion); 
    return $arreglo; 
        $r = obtenerArreglo($sql);	
		
		
?>
