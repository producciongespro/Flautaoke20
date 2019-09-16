<?php
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
	header("Content-Type: text/html; charset=utf-8");
	$method = $_SERVER['REQUEST_METHOD'];
	$JSONData = file_get_contents("php://input");
	$dataObject = json_decode($JSONData);  
	
	require ('funcs/conexion.php');	

	
	

		$idUsuario = $dataObject-> idUsuario;
		$usuario = utf8_decode( $dataObject-> usuario) ;
		$nombre = utf8_decode($dataObject-> nombre);
		$apellido1 = utf8_decode($dataObject-> apellido1);
		$apellido2 = utf8_decode($dataObject-> apellido2);		
		$centroEducativo =  utf8_decode($dataObject-> centroEducativo);
		$clases = $dataObject-> clases;
		$correo = $dataObject-> correo;
		$formacion = $dataObject-> formacion;		
		$notificaciones = $dataObject-> notificaciones;
		$tieneCorreo = $dataObject-> tieneCorreo;
		$avatar = $dataObject-> avatar;

		$conn = conectarDB();
		
		
		
		if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
		}

		//Conversion de valores booleanos a integer
		if ($clases == true) {
			$clases = 1;
        }else {
			$clases = 0;
		}

			if ($formacion == true) {
			$formacion = 1;
        }else {
			$formacion = 0;
		}

		if ($notificaciones == true) {
			$notificaciones = 1;
        }else {
			$notificaciones = 0;
		}

		if ($tieneCorreo == true) {
			$tieneCorreo = 1;
        }else {
			$tieneCorreo = 0;
		}


		$sql = "UPDATE usuarios SET usuario='$usuario', nombre='$nombre', apellido1='$apellido1', apellido2='$apellido2', centroEducativo='$centroEducativo', clases='$clases', correo='$correo', formacion='$formacion', notificaciones='$notificaciones', tieneCorreo='$tieneCorreo', avatar='$avatar' WHERE idUsuario= $idUsuario";

		if ($conn->query($sql) === TRUE) {
			echo "Record updated successfully";
		} else {
			echo "Error updating record: " . $conn->error;
		}

		$conn->close();

?>
