<?php
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
	header("Content-Type: text/html; charset=utf-8");
	
	require 'funcs/conexion.php';
	require 'funcs/funcs.php';
	$JSONData = file_get_contents("php://input");
	$dataObject = json_decode($JSONData);		
		
		$nombre = utf8_decode ($dataObject-> nombre);
		$apellido1 = utf8_decode ( $dataObject-> apellido1);
		$apellido2 = utf8_decode ( $dataObject-> apellido2);
		$usuario = utf8_decode ($dataObject-> usuario);
		$pais = utf8_decode ($dataObject-> pais);
		$provincia = utf8_decode ($dataObject-> provincia);
		$sexo = $dataObject-> sexo;
		$fechaNacimiento = $dataObject-> fechaNacimiento;
		$clave = $dataObject-> clave;
		$confirmaClave = $dataObject-> confirmaClave;
		$activo = 1;
		$tipoUsuario = 1;
	
	//Se crea el objeto persona para enviarlo al cliente en caso de resgistro satisfactorio o error			
	$persona = new stdClass();
	$persona->usuario = "nulo";
	$persona->error = 1;
	$persona->mensaje="nulo";

	//$claveEncriptada =  $clave;
	//$token = "456defr";

	$claveEncriptada = hashPassword($clave);
	$token = generateToken();

	$tipoUsuario = 4;
	$activo = 1;


	// Create connection
		$conn = conectarDB();
		// Check connection
		if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
			$persona->mensaje = "Error de conexión";
			$persona->error = 1;
			echo json_encode( $persona );
		}

		$sql = "INSERT INTO usuarios (usuario, claveEncriptada, nombre, apellido1, apellido2, pais, provincia, fechaNacimiento, sexo, token, tipoUsuario, activo)
		VALUES ('$usuario', '$claveEncriptada', '$nombre', '$apellido1', '$apellido2', '$pais', '$provincia', '$fechaNacimiento', '$sexo', '$token', '$tipoUsuario', '$activo')";

		if ($conn->query($sql) === TRUE) {
			$persona->mensaje = "Registro insertado de forma satisfacotria";
			$persona->error = 0;
			$persona->usuario = $usuario;
			echo json_encode( $persona );
		} else {
			$persona->mensaje = "Error al insertar registro";
			$persona->error = 1;
			echo json_encode( $persona );
		}

		$conn->close();
		








?>