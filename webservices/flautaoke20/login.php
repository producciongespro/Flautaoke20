<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");
$method = $_SERVER['REQUEST_METHOD'];
$errors = array();
$mensaje = array();
// verifica si la peticiòn es de tipo AJAX
  //if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH'])== 'xmlhttprequest'    ) {
    require('funcs/conexion.php');
    require('funcs/funcs.php');
    $mysqli = conectarDB();
    //sleep(1);
	
	$JSONData = file_get_contents("php://input");
	$dataObject = json_decode($JSONData);
	
    //creaciòn de la sesiòn:
    session_start();

    // Especifica que tipo de carcateres va a escapar
    $mysqli->set_charset('utf8');

    //real escape es para filtrar los carcateres que van a etrar a la consulta SQL para evita SQL inyection
	$usuario = $dataObject-> usuario;
	$pas =	$dataObject-> clave;
    //$usuario = $mysqli->real_escape_string( $_POST['usuario']);
    //$pas = $mysqli->real_escape_string( $_POST['clave']);
    if ($nueva_consulta = $mysqli->prepare("Select nombre, apellido1, apellido2, nickname, id_tipo, id_usr, password, avatar, correo, centro_educativo From usuarios Where nickname = ?")) {
        $nueva_consulta->bind_param('s', $usuario);
        $nueva_consulta->execute();
        $resultado = $nueva_consulta->get_result();
        if ($resultado->num_rows == 1) {
            $datos = $resultado->fetch_assoc();
             $encriptado_db = $datos['password'];
            if ((password_verify($pas, $encriptado_db) AND (isActivo($usuario))))
            {
                $_SESSION['usuario'] = $datos['nickname'];
                echo json_encode(array('error'=>false,'usuario'=>$datos['nickname'], 'nombre'=>$datos['nombre'],  'apellido1'=>$datos['apellido1'],  'apellido2'=>$datos['apellido2'],    'correo'=>$datos['correo'],     'centro_educativo'=>$datos['centro_educativo'],       'id'=>$datos['id_usr'], 'avatar'=>$datos['avatar']  ) );
              }

               else {
                //  $errors[] = "El usuario y/o clave son incorrectas, vuelva a intentarlo.";
                 echo json_encode(array('error'=>true, 'error_msg' => 'La clave es incorrecta, vuelva a intentarlo.'));
                    }
        }
        else {
              //$errors[] = "El usuario y/o clave son incorrectas, vuelva a intentarlo.";
              echo json_encode(array('error'=>true, 'error_msg' => 'El usuario no existe.'));
        }
        $nueva_consulta->close();
      }
 // }
$mysqli->close();
?>
