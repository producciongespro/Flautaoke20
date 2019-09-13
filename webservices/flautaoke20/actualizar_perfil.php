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
		$usuario = $dataObject-> usuario;
		$nombre = $dataObject-> nombre;
		$apellido1 = $dataObject-> apellido1;
		$apellido2 = $dataObject-> apellido2;		
		$centroEducativo = $dataObject-> centroEducativo;
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

		$sql = "UPDATE usuarios SET usuario='$usuario', nombre='$nombre', apellido1='$apellido1', apellido2='$apellido2', centroEducativo='$centroEducativo', clases='$clases', correo='$correo', formacion='$formacion', notificaciones='$notificaciones', tieneCorreo='$tieneCorreo', avatar='avatar' WHERE idUsuario= $idUsuario";

		if ($conn->query($sql) === TRUE) {
			echo "Record updated successfully";
		} else {
			echo "Error updating record: " . $conn->error;
		}

		$conn->close();

?>
