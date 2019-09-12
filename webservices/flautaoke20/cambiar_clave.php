<?php
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
	header("Content-Type: text/html; charset=utf-8");
  	require 'funcs/conexion.php';
	require 'funcs/funcs.php';
  $errors = array();
  $mysqli= conectarDB();
	if(!empty($_POST))
	{
	    $usuario = $mysqli->real_escape_string($_POST['usuario']);
		$password = $mysqli->real_escape_string($_POST['clave1']);
		$con_password = $mysqli->real_escape_string($_POST['clave2']);

 		if(!validaPassword($password, $con_password))
		{
			$errors[] = "Las contraseñas no coinciden";
			 echo "<p >Las contraseñas no coinciden</p>";

		}

		if(!usuarioExiste($usuario))
		{
			$errors[] = "El nombre de usuario $usuario no existe";
			echo "<p>El usuario $usuario no existe</p>";


		}

		if(count($errors) == 0)
		{


				$pass_hash = hashPassword($password);
				 echo "<script>console.log('$pass_hash')</script>";
				$registro = cambiaPassword($usuario, $pass_hash);
				if($registro == true )
				{

					echo "Su contraseña ha sido cambiada";

					echo "<br><a href='index.php' >Iniciar Sesion</a>";
					exit;

					} else {
					    	echo "Su contraseña no ha sido cambiada";
					$errors[] = "Error al cambiar el Password";
				}



		}

	}

?>
