<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header("Content-Type: text/html; charset=utf-8");
$mysqli=conectarDB();
	function isNull($nombre, $user, $pass, $pass_con){
		if(strlen(trim($nombre)) < 1 || strlen(trim($user)) < 1 || strlen(trim($pass)) < 1 || strlen(trim($pass_con)) < 1 )
		{
			return true;
			} else {
			return false;
		}
	}

	function validaPassword($var1, $var2)
	{
		if (strcmp($var1, $var2) !== 0){
			return false;
			} else {
			return true;
		}
	}

	function minMax($min, $max, $valor){
		if(strlen(trim($valor)) < $min)
		{
			return true;
		}
		else if(strlen(trim($valor)) > $max)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	function usuarioExiste($usuario)
	{
		global $mysqli;

		$stmt = $mysqli->prepare("SELECT id_usr FROM usuarios WHERE nickname = ? LIMIT 1");
		$stmt->bind_param("s", $usuario);
		$stmt->execute();
		$stmt->store_result();
		$num = $stmt->num_rows;
		$stmt->close();

		if ($num > 0){
			return true;
			} else {
			return false;
		}
	}

	function generateToken()
	{
		$gen = md5(uniqid(mt_rand(), false));
		return $gen;
	}

	function hashPassword($password)
	{
		$hash = password_hash($password, PASSWORD_DEFAULT);
		return $hash;
	}

	function resultBlock($errors){
		if(count($errors) > 0)
		{
			echo "<div id='error' class='alert alert-danger' role='alert'>
			<a href='#' onclick=\"showHide('error');\">[X]</a>
			<ul>";
			foreach($errors as $error)
			{
				echo "<li>".$error."</li>";
			}
			echo "</ul>";
			echo "</div>";
		}
	}

	function registraUsuario($nombre, $apellido1, $apellido2,  $claveEncriptada, $usuario, $pais, $provincia, $sexo, $fechaNacimiento, $activo, $token, $tipoUsuario){
		$mysqli = conectarDB();
      mysqli_query(
			//$mysqli,"INSERT INTO usuarios (nombre, apeliido1, apeliido2,  claveEncriptada, usuario,  pais, provincia, sexo, fechaNacimiento, activo, token, tipoUsuario) VALUES( '$nombre', '$apellido1', '$apellido2',  '$claveEncriptada', '$usuario', '$pais', '$provincia', '$sexo', '$fechaNacimiento', '$activo, '$token', '$tipoUsuario')") or die ("Problemas al insertar registro".mysqli_error($mysqli));
			$mysqli,"INSERT INTO usuarios (nombre, apeliido1, apeliido2,  claveEncriptada, usuario,  pais, provincia, sexo, fechaNacimiento, activo, token, tipoUsuario) VALUES( 'pepe', 'apellido1', 'apellido2',  'claveEncriptada', 'usuario', 'pais', 'provincia', 'm', '2018-04-17', '1, '121212', '1')") or die ("Problemas al insertar registro".mysqli_error($mysqli));
			if ($mysqli) {
				return 1;
			}
		 else {
			return 0;
		}
	}

	function validaIdToken($id, $token){
		global $mysqli;

		$stmt = $mysqli->prepare("SELECT activacion FROM usuarios WHERE id_usr = ? AND token = ? LIMIT 1");
		$stmt->bind_param("is", $id, $token);
		$stmt->execute();
		$stmt->store_result();
		$rows = $stmt->num_rows;

		if($rows > 0) {
			$stmt->bind_result($activacion);
			$stmt->fetch();

			if($activacion == 1){
				$msg = "La cuenta ya se activo anteriormente.";
				} else {
				if(activarUsuario($id)){
					$msg = 'Cuenta activada.';
					} else {
					$msg = 'Error al Activar Cuenta';
				}
			}
			} else {
			$msg = 'No existe el registro para activar.';
		}
		return $msg;
	}

	function activarUsuario($id)
	{
		global $mysqli;

		$stmt = $mysqli->prepare("UPDATE usuarios SET activacion=1 WHERE id_usr = ?");
		$stmt->bind_param('s', $id);
		$result = $stmt->execute();
		$stmt->close();
		return $result;
	}

	function isNullLogin($usuario, $password){
		if(strlen(trim($usuario)) < 1 || strlen(trim($password)) < 1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	function login($usuario, $password)
	{
		global $mysqli;

		$stmt = $mysqli->prepare("SELECT id_usr, id_tipo, password FROM usuarios WHERE nickname = ? || correo = ? LIMIT 1");
		$stmt->bind_param("ss", $usuario, $usuario);
		$stmt->execute();
		$stmt->store_result();
		$rows = $stmt->num_rows;

		if($rows > 0) {

			if(isActivo($usuario)){

				$stmt->bind_result($id, $id_tipo, $passwd);
				$stmt->fetch();

				$validaPassw = password_verify($password, $passwd);

				if($validaPassw){

					lastSession($id);
					$_SESSION['id_usuario'] = $id;
					$_SESSION['tipo_usuario'] = $id_tipo;

					header("location: principal.php");
					} else {

					$errors = "La contrase&ntilde;a es incorrecta";
				}
				} else {
				$errors = 'El usuario no esta activo';
			}
			} else {
			$errors = "El nombre de usuario no existe";
		}
		return $errors;
	}

	function lastSession($id)
	{
		global $mysqli;

		$stmt = $mysqli->prepare("UPDATE usuarios SET last_session=NOW(), token_password='', password_request=1 WHERE id_usr = ?");
		$stmt->bind_param('s', $id);
		$stmt->execute();
		$stmt->close();
	}

	function isActivo($usuario)
	{
		global $mysqli;
		$stmt = $mysqli->prepare("SELECT activacion FROM usuarios WHERE nickname = ? || correo = ? LIMIT 1");
		$stmt->bind_param('ss', $usuario, $usuario);
		$stmt->execute();
		$stmt->bind_result($activacion);
		$stmt->fetch();

		if ($activacion == 1)
		{

			return true;
		}
		else
		{
			return false;
		}
	}

	function generaTokenPass($user_id)
	{
		global $mysqli;

		$token = generateToken();

		$stmt = $mysqli->prepare("UPDATE usuarios SET token_password=?, password_request=1 WHERE id_usr = ?");
		$stmt->bind_param('ss', $token, $user_id);
		$stmt->execute();
		$stmt->close();

		return $token;
	}

	function getValor($campo, $campoWhere, $valor)
	{
		global $mysqli;

		$stmt = $mysqli->prepare("SELECT $campo FROM usuarios WHERE $campoWhere = ? LIMIT 1");
		$stmt->bind_param('s', $valor);
		$stmt->execute();
		$stmt->store_result();
		$num = $stmt->num_rows;

		if ($num > 0)
		{
			$stmt->bind_result($_campo);
			$stmt->fetch();
			return $_campo;
		}
		else
		{
			return null;
		}
	}

	function getPasswordRequest($id)
	{
		global $mysqli;

		$stmt = $mysqli->prepare("SELECT password_request FROM usuarios WHERE id_usr = ?");
		$stmt->bind_param('i', $id);
		$stmt->execute();
		$stmt->bind_result($_id);
		$stmt->fetch();

		if ($_id == 1)
		{
			return true;
		}
		else
		{
			return null;
		}
	}

	function verificaTokenPass($user_id, $token){

		global $mysqli;

		$stmt = $mysqli->prepare("SELECT activacion FROM usuarios WHERE id_usr = ? AND token_password = ? AND password_request = 1 LIMIT 1");
		$stmt->bind_param('is', $user_id, $token);
		$stmt->execute();
		$stmt->store_result();
		$num = $stmt->num_rows;

		if ($num > 0)
		{
			$stmt->bind_result($activacion);
			$stmt->fetch();
			if($activacion == 1)
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		else
		{
			return false;
		}
	}



	function cambiaPassword($user, $password){
        echo "<script>console.log('Tratando de cambiar clave a:')</script>";
        echo "<script>console.log('$user')</script>";
		global $mysqli;

		$stmt = $mysqli->prepare("UPDATE usuarios SET password = ? WHERE usuario = ?");
		$stmt->bind_param('ss', $password, $user);
                echo "<script>console.log('Ejecutando:')</script>";
        if($stmt->execute()){
			return true;
			} else {
			return false;
		}
	}
