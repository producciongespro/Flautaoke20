<?php
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
	header("Content-Type: text/html; charset=utf-8");
	
	require 'funcs/conexion.php';
	require 'funcs/funcs.php';
	$JSONData = file_get_contents("php://input");
	$dataObject = json_decode($JSONData);
	
		$errors = array();
		
		$nombre =   $dataObject-> nombre;
		$apellido1 =  $dataObject-> apellido1;
		$apellido2 = $dataObject-> apellido2;
		$usuario = $dataObject-> usuario;
		$pais = $dataObject-> pais;
		$provincia = $dataObject-> provincia;
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



 		if(isNull($nombre, $usuario, $clave, $confirmaClave))
		{
			$errors[] = "Debe llenar todos los campos";
			$persona->mensaje = "Debe llenar todos los campos";
			$persona->error = 1;
		}

 		if(!validaPassword($clave, $confirmaClave))
		{
			$errors[] = "Las contraseñas no coinciden";
			$persona->mensaje = "Las contraseñas no coinciden";
			$persona->error = 1;
		}

		// if(usuarioExiste($usuario))
		// {
		// 	$errors[] = "El nombre de usuario $usuario ya existe";
		// 	echo "<p >El nombre de usuario $usuario ya existe</p>";
		// }

		if(count($errors) == 0)
		{

				$claveEncriptada = hashPassword($clave);
				$token = generateToken();
				
			
				

				$registro = registraUsuario($usuario, $claveEncriptada, $nombre, $apellido1, $apellido2, $pais, $provincia, $fechaNacimiento, $sexo, $token, $tipoUsuario, $activo);

				if($registro > 0 )
				{

					$persona->mensaje = '¡Felicitaciones! Su cuenta ha sido registrada. Oprima el botón "OK" e ingrese su usuario y contraseña.';	              
					$persona->error = 0;
					$persona->usuario = $usuario;
					echo json_encode( $persona );  
					exit;

					} else {
						$errors[] = "Error al crear la cuenta";
						$persona->mensaje = "Error al crear cuenta";
						$persona->error = 1;
						echo json_encode( $persona );
					}

		} else {
			echo json_encode( $persona );
		}



	function calculaedad($fechanacimiento){
	  list($ano,$mes,$dia) = explode("-",$fechanacimiento);
	  $ano_diferencia  = date("Y") - $ano;
	  $mes_diferencia = date("m") - $mes;
	  $dia_diferencia   = date("d") - $dia;
	  if ($dia_diferencia < 0 || $mes_diferencia < 0)
	    $ano_diferencia--;
	  return $ano_diferencia;
	}

?>
